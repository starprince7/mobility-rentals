import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";
import React, { ComponentProps, useState, useEffect, useRef } from "react";
import Animated, { FadeIn, AnimateProps } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import { sha256 } from "js-sha256";

// Properly type the style prop
type AnimatedImageProps = AnimateProps<ComponentProps<typeof Image>>;

interface CachedImageProps extends Omit<AnimatedImageProps, "source"> {
  source: ImageSourcePropType | { uri: string } | number;
  // Optional callback when image is loaded from cache
  onCacheLoad?: () => void;
  // Optional callback when image is loaded from network
  onNetworkLoad?: () => void;
  // Optional placeholder color
  placeholderColor?: string;
  // Minimum acceptable file size in bytes (to detect corrupt images)
  minFileSize?: number;
  // Debounce time in ms for source changes
  debounceTime?: number;
}

// Helper type for source comparison
type ImageSource = ImageSourcePropType | { uri: string } | number;

// Define more specific FileInfo types
type FileInfoSuccess = FileSystem.FileInfo & { exists: true; size: number };
type FileInfoFailure = FileSystem.FileInfo & { exists: false };
type FileInfoResult = FileInfoSuccess | FileInfoFailure;

// Type guard to check if FileInfo has size
function hasFileSize(fileInfo: FileInfoResult): fileInfo is FileInfoSuccess {
  return fileInfo.exists && "size" in fileInfo;
}

// In-memory cache for image URIs
const imageCache = new Map<string, string>();
// Cache for failed URIs to prevent retrying repeatedly
const failedUriCache = new Set<string>();
// Maximum failed URI cache size
const MAX_FAILED_CACHE_SIZE = 100;

// For debugging
const logStates = (
  prefix: string,
  imageUri: string | null,
  isLoading: boolean,
  hasError: boolean,
  isVisible: boolean
) => {
  console.log(
    `${prefix} - imageUri: ${
      imageUri ? "set" : "null"
    }, isLoading: ${isLoading}, hasError: ${hasError}, isVisible: ${isVisible}`
  );
};

export function NiceImage({
  source,
  onCacheLoad,
  onNetworkLoad,
  placeholderColor = "#f0f0f0",
  minFileSize = 100, // Most valid images should be larger than 100 bytes
  debounceTime = 300, // Debounce time for rapid source changes
  style,
  ...props
}: CachedImageProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sourceUriRef = useRef<string | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const initialLoadRef = useRef(true);

  // Helper to check if an object is a URI object
  const isUriObject = (obj: any): obj is { uri: string } => {
    return (
      obj !== null &&
      typeof obj === "object" &&
      "uri" in obj &&
      typeof obj.uri === "string"
    );
  };

  // Helper to extract URI from a source
  const getUriFromSource = (src: ImageSource): string | null => {
    if (typeof src === "number") {
      const resolved = Image.resolveAssetSource(src);
      return resolved?.uri || null;
    } else if (isUriObject(src)) {
      return src.uri;
    }
    return null;
  };

  // Reset state for new image loading
  const resetState = () => {
    if (isMountedRef.current) {
      setImageUri(null);
      setIsLoading(true);
      setHasError(false);
      setIsVisible(false);
    }
  };

  // Handle loading and caching the image
  const loadImage = async (imageSource: ImageSource) => {
    // Clear any pending load timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }

    try {
      // Handle static resources (from require())
      if (typeof imageSource === "number") {
        const resolvedSource = Image.resolveAssetSource(imageSource);
        if (resolvedSource?.uri && isMountedRef.current) {
          console.log("Setting static resource image:", resolvedSource.uri);
          setImageUri(resolvedSource.uri);
          setIsLoading(false);
          setIsVisible(true);
        } else {
          throw new Error("Could not resolve static image source");
        }
        return;
      }

      // Handle null or undefined source
      if (!isUriObject(imageSource) || !imageSource.uri) {
        throw new Error("Invalid image source");
      }

      const { uri } = imageSource;
      console.log("Loading image from URI:", uri);

      // Check if this URI has previously failed
      if (failedUriCache.has(uri)) {
        console.log("URI previously failed, skipping:", uri);
        throw new Error("Image previously failed to load");
      }

      // Generate a unique filename based on the URI
      const hash = sha256(uri);
      const ext = uri.includes(".")
        ? uri.substring(uri.lastIndexOf(".")).split("?")[0]
        : ".jpg";
      // Ensure we have a valid filename extension
      const safeExt = ext.length > 10 || !ext.match(/\.\w+$/) ? ".jpg" : ext;
      const filename = `${hash}${safeExt}`;
      const cacheFolder = `${FileSystem.cacheDirectory}images/`;
      const cacheFilepath = `${cacheFolder}${filename}`;

      // Check memory cache first
      if (imageCache.has(uri)) {
        const cachedUri = imageCache.get(uri);
        if (cachedUri) {
          console.log("Found image in memory cache:", cachedUri);
          // Verify the cached file still exists and is valid
          const fileInfo = (await FileSystem.getInfoAsync(
            cachedUri.replace("file://", "")
          )) as FileInfoResult;

          if (
            hasFileSize(fileInfo) &&
            fileInfo.size >= minFileSize &&
            isMountedRef.current
          ) {
            console.log("Using cached image from memory:", cachedUri);
            setImageUri(cachedUri);
            setIsLoading(false);
            setIsVisible(true);
            onCacheLoad?.();
            return;
          } else {
            // Remove invalid cache entry
            console.log(
              "Cached file invalid or too small, removing from cache"
            );
            imageCache.delete(uri);
          }
        }
      }

      // Check if cache directory exists, create if not
      const { exists } = await FileSystem.getInfoAsync(cacheFolder);
      if (!exists) {
        console.log("Creating cache directory:", cacheFolder);
        await FileSystem.makeDirectoryAsync(cacheFolder, {
          intermediates: true,
        });
      }

      // Check if file exists in cache
      const fileInfo = (await FileSystem.getInfoAsync(
        cacheFilepath
      )) as FileInfoResult;
      console.log("File info for cache:", fileInfo);

      if (hasFileSize(fileInfo) && fileInfo.size >= minFileSize) {
        // Use cached file if it's large enough to be valid
        if (isMountedRef.current) {
          const cachedUri = `file://${cacheFilepath}`;
          console.log("Using cached image from filesystem:", cachedUri);
          setImageUri(cachedUri);
          imageCache.set(uri, cachedUri);
          setIsLoading(false);
          setIsVisible(true);
          onCacheLoad?.();
        }
      } else {
        // If cached file exists but is too small, delete it
        if (fileInfo.exists) {
          console.log("Existing cached file is too small, deleting");
          try {
            await FileSystem.deleteAsync(cacheFilepath, { idempotent: true });
          } catch (deleteError) {
            console.warn("Error deleting corrupt cache file:", deleteError);
          }
        }

        // Download and cache the image
        // console.log("Downloading image:", uri);
        const downloadResult = await FileSystem.downloadAsync(
          uri,
          cacheFilepath
        );
        // console.log("Download result:", downloadResult);

        if (downloadResult.status === 200 && isMountedRef.current) {
          // Verify the downloaded file is large enough to be valid
          const downloadedFileInfo = (await FileSystem.getInfoAsync(
            cacheFilepath
          )) as FileInfoResult;

          if (
            hasFileSize(downloadedFileInfo) &&
            downloadedFileInfo.size >= minFileSize
          ) {
            const cachedUri = `file://${cacheFilepath}`;
            // console.log("Downloaded and cached image successfully:", cachedUri);
            setImageUri(cachedUri);
            imageCache.set(uri, cachedUri);
            setIsLoading(false);
            setIsVisible(true);
            onNetworkLoad?.();
          } else {
            // File is too small, likely corrupt
            console.warn(
              `Downloaded image is too small (${
                hasFileSize(downloadedFileInfo)
                  ? downloadedFileInfo.size
                  : "unknown"
              } bytes), might be corrupt`
            );
            await FileSystem.deleteAsync(cacheFilepath, { idempotent: true });
            throw new Error("Downloaded image is too small and likely corrupt");
          }
        } else {
          throw new Error(
            `Download failed with status ${downloadResult.status}`
          );
        }
      }
    } catch (error) {
      // console.error("Error loading image:", error);

      // Add to failed cache if it's a URI
      const sourceUri = isUriObject(imageSource) ? imageSource.uri : null;

      if (sourceUri) {
        // Limit the size of failedUriCache
        if (failedUriCache.size >= MAX_FAILED_CACHE_SIZE) {
          // Remove a random element (first in this case)
          const firstKey = failedUriCache.values().next().value;
          failedUriCache.delete(firstKey);
        }

        failedUriCache.add(sourceUri);

        // As a last resort, try to display the original URI directly
        if (isMountedRef.current) {
          // console.log("Showing original URI as fallback:", sourceUri);
          setImageUri(sourceUri);
          setHasError(true);
          setIsLoading(false);
        }
      } else if (isMountedRef.current) {
        console.log("Setting error state with no fallback");
        setHasError(true);
        setIsLoading(false);
      }
    }
  };

  // Handle source changes
  useEffect(() => {
    const currentUri = getUriFromSource(source);
    // console.log("Source changed:", source, "Current URI:", currentUri);

    // Force initial load
    if (initialLoadRef.current) {
      // console.log("Initial load, forcing image loading");
      initialLoadRef.current = false;
      if (currentUri) {
        resetState();
        sourceUriRef.current = currentUri;

        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
        }

        loadTimeoutRef.current = setTimeout(() => {
          loadImage(source);
        }, debounceTime);
      }
      return;
    }

    // Skip if source URI hasn't actually changed
    if (currentUri === sourceUriRef.current) {
      // console.log("Source didn't actually change, skipping reload");
      return;
    }

    // console.log("Source URI changed from", sourceUriRef.current, "to", currentUri);
    sourceUriRef.current = currentUri;
    resetState();

    // Debounce loading to prevent rapid flickering
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    if (currentUri) {
      loadTimeoutRef.current = setTimeout(() => {
        loadImage(source);
      }, debounceTime);
    }

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
  }, [source, debounceTime, minFileSize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  // For debugging
  useEffect(() => {
    // logStates("State updated", imageUri, isLoading, hasError, isVisible);
  }, [imageUri, isLoading, hasError, isVisible]);

  // Show placeholder during loading
  if (isLoading) {
    // console.log("Rendering placeholder (loading)");
    return (
      <Animated.View
        style={[style as any, { backgroundColor: placeholderColor }]}
      />
    );
  }

  // Show the actual image with a fade-in animation
  const sourceUriDirect = getUriFromSource(source);
  const finalUri = imageUri || sourceUriDirect || "";
  // console.log("Rendering actual image:", finalUri);

  return (
    <Animated.Image
      {...props}
      style={style}
      entering={isVisible && !hasError ? FadeIn.duration(500) : undefined}
      source={{ uri: finalUri }}
      onLoad={() => {
        // console.log("Image loaded successfully:", finalUri);
        if (isMountedRef.current) {
          setIsVisible(true);
        }
      }}
      onError={(error) => {
        // console.error("Error loading image in component:", error);
        // Mark as error and keep the placeholder visible
        if (!isMountedRef.current) return;

        setHasError(true);

        // If the source is a static resource, use it as fallback
        if (typeof source === "number") {
          const resolvedUri = Image.resolveAssetSource(source)?.uri;
          if (resolvedUri) {
            console.log("Using static resource as fallback:", resolvedUri);
            setImageUri(resolvedUri);
            setIsVisible(true);
          }
        } else if (isUriObject(source) && imageUri !== source.uri) {
          // As a last attempt, try the original source directly
          console.log("Using original URI as fallback:", source.uri);
          setImageUri(source.uri);
          setIsLoading(false);
        }
      }}
    />
  );
}

// Helper function to clear the image cache
export async function clearImageCache() {
  try {
    const cacheFolder = `${FileSystem.cacheDirectory}images/`;
    await FileSystem.deleteAsync(cacheFolder, { idempotent: true });
    imageCache.clear();
    failedUriCache.clear();
    console.log("Image cache cleared successfully");
  } catch (error) {
    console.error("Error clearing image cache:", error);
  }
}
