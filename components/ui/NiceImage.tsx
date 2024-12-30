import { Image, ImageSourcePropType } from "react-native";
import React, { ComponentProps, useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import { sha256 } from "js-sha256";

interface CachedImageProps
  extends Omit<ComponentProps<typeof Animated.Image>, "source"> {
  source: ImageSourcePropType | { uri: string } | number;
  // Optional callback when image is loaded from cache
  onCacheLoad?: () => void;
  // Optional callback when image is loaded from network
  onNetworkLoad?: () => void;
}

const imageCache = new Map<string, string>();

export function NiceImage({
  source,
  onCacheLoad,
  onNetworkLoad,
  ...props
}: CachedImageProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        // Handle static resources
        if (typeof source === "number") {
          setImageUri(Image.resolveAssetSource(source).uri);
          setIsLoading(false);
          return;
        }

        const { uri } = source;

        // Generate a unique filename based on the URI
        const hash = sha256(uri);
        const ext = uri.substring(uri.lastIndexOf("."));
        const filename = `${hash}${ext}`;
        const cacheFolder = `${FileSystem.cacheDirectory}images/`;
        const cacheFilepath = `${cacheFolder}${filename}`;

        // Check memory cache first
        if (imageCache.has(uri)) {
          setImageUri(imageCache.get(uri)!);
          setIsLoading(false);
          onCacheLoad?.();
          return;
        }

        // Check if cache directory exists, create if not
        const { exists } = await FileSystem.getInfoAsync(cacheFolder);
        if (!exists) {
          await FileSystem.makeDirectoryAsync(cacheFolder, {
            intermediates: true,
          });
        }

        // Check if file exists in cache
        const fileInfo = await FileSystem.getInfoAsync(cacheFilepath);

        if (fileInfo.exists) {
          // Use cached file
          if (isMounted) {
            setImageUri(`file://${cacheFilepath}`);
            imageCache.set(uri, `file://${cacheFilepath}`);
            setIsLoading(false);
            onCacheLoad?.();
          }
        } else {
          // Download and cache the image
          const downloadResult = await FileSystem.downloadAsync(
            uri,
            cacheFilepath
          );

          if (isMounted && downloadResult.status === 200) {
            setImageUri(`file://${cacheFilepath}`);
            imageCache.set(uri, `file://${cacheFilepath}`);
            setIsLoading(false);
            onNetworkLoad?.();
          }
        }
      } catch (error) {
        console.error("Error loading image:", error);
        // Fall back to original URI if caching fails
        if (isMounted && typeof source !== "number") {
          setImageUri(source.uri);
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [source]);

  if (!imageUri || isLoading) {
    // You can customize this loading state
    return (
      <Animated.View style={[props.style, { backgroundColor: "#f0f0f0" }]} />
    );
  }

  return <Animated.Image {...props} source={{ uri: imageUri }} />;
}

// Helper function to clear the image cache
export async function clearImageCache() {
  try {
    const cacheFolder = `${FileSystem.cacheDirectory}images/`;
    await FileSystem.deleteAsync(cacheFolder, { idempotent: true });
    imageCache.clear();
  } catch (error) {
    console.error("Error clearing image cache:", error);
  }
}
