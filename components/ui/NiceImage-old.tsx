import { Image, ImageSourcePropType, View } from "react-native";
import React, { ComponentProps, useState, useEffect } from "react";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
} from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import { sha256 } from "js-sha256";

interface CachedImageProps
  extends Omit<ComponentProps<typeof Animated.Image>, "source"> {
  source: ImageSourcePropType | { uri: string } | number;
  onCacheLoad?: () => void;
  onNetworkLoad?: () => void;
  placeholderColor?: string;
  minFileSize?: number;
  fadeInDuration?: number;
}

// Global preloading queue
const preloadQueue: string[] = [];
const imageCache = new Map<string, string>();

// Preload function that can be called ahead of time
export function preloadImage(uri: string): void {
  if (typeof uri !== 'string') return;
  
  if (!preloadQueue.includes(uri)) {
    preloadQueue.push(uri);
    // Start preloading without waiting
    cacheImage(uri).catch(console.error);
  }
}

// Separate caching logic to be reused
async function cacheImage(uri: string): Promise<string | null> {
  try {
    // Generate a unique filename based on the URI
    const hash = sha256(uri);
    const ext = uri.includes('.') ? uri.substring(uri.lastIndexOf(".")).split('?')[0] : '.jpg';
    const safeExt = ext.length > 10 || !ext.match(/\.\w+$/) ? '.jpg' : ext;
    const filename = `${hash}${safeExt}`;
    const cacheFolder = `${FileSystem.cacheDirectory}images/`;
    const cacheFilepath = `${cacheFolder}${filename}`;

    // Check memory cache first
    if (imageCache.has(uri)) {
      const cachedUri = imageCache.get(uri);
      if (cachedUri) {
        const fileInfo = await FileSystem.getInfoAsync(cachedUri.replace('file://', ''));
        if (fileInfo.exists && fileInfo.size >= 100) {
          return cachedUri;
        } else {
          imageCache.delete(uri);
        }
      }
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

    if (fileInfo.exists && fileInfo.size >= 100) {
      const cachedUri = `file://${cacheFilepath}`;
      imageCache.set(uri, cachedUri);
      return cachedUri;
    } else {
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(cacheFilepath, { idempotent: true }).catch(() => {});
      }
      
      const downloadResult = await FileSystem.downloadAsync(uri, cacheFilepath);

      if (downloadResult.status === 200) {
        const downloadedFileInfo = await FileSystem.getInfoAsync(cacheFilepath);
        
        if (downloadedFileInfo.size >= 100) {
          const cachedUri = `file://${cacheFilepath}`;
          imageCache.set(uri, cachedUri);
          return cachedUri;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error caching image:", error);
    return null;
  }
}

export function NiceImage({
  source,
  onCacheLoad,
  onNetworkLoad,
  placeholderColor = "#f0f0f0",
  minFileSize = 100,
  fadeInDuration = 200,
  style,
  ...props
}: CachedImageProps) {
  const [imageUri, setImageUri] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Use Reanimated 2 shared values instead of Animated.Value
  const opacity = useSharedValue(0);
  
  // Create animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Fade out current image
        opacity.value = withTiming(0, { duration: fadeInDuration / 2 });
        
        // Handle static resources (from require())
        if (typeof source === "number") {
          const resolvedSource = Image.resolveAssetSource(source);
          if (resolvedSource?.uri) {
            setImageUri(resolvedSource.uri);
            setTimeout(() => {
              if (isMounted) {
                setIsLoading(false);
                // Fade in the new image
                opacity.value = withTiming(1, { duration: fadeInDuration });
              }
            }, 10);
          } else {
            throw new Error("Could not resolve static image source");
          }
          return;
        }
        
        // Handle null or undefined source
        if (!source || typeof source !== 'object' || !('uri' in source) || !source.uri) {
          throw new Error("Invalid image source");
        }

        const { uri } = source;
        
        // Try to get cached image
        const cachedUri = await cacheImage(uri);
        
        if (isMounted) {
          if (cachedUri) {
            setImageUri(cachedUri);
            onCacheLoad?.();
          } else {
            // Fallback to original URI if caching fails
            setImageUri(uri);
            onNetworkLoad?.();
          }
          
          setIsLoading(false);
          
          // Fade in the new image
          opacity.value = withTiming(1, { duration: fadeInDuration });
        }
      } catch (error) {
        console.error("Error loading image:", error);
        if (isMounted) {
          setHasError(true);
          if (typeof source !== "number" && source && 'uri' in source) {
            setImageUri(source.uri);
          }
          setIsLoading(false);
          // Still fade in even on error
          opacity.value = withTiming(1, { duration: fadeInDuration });
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [source, onCacheLoad, onNetworkLoad, minFileSize, fadeInDuration]);

  if (!imageUri || isLoading) {
    // Placeholder during loading
    return (
      <View 
        style={[
          style, 
          { backgroundColor: placeholderColor }
        ]} 
      />
    );
  }

  return (
    <Animated.Image 
      {...props} 
      source={{ uri: imageUri }}
      style={[style, animatedStyle]}
      onError={(error) => {
        // If the image failed to load from cache, try the original source
        if (imageUri.startsWith('file://') && typeof source !== "number" && source && 'uri' in source) {
          console.log("Falling back to original source:", source.uri);
          setImageUri(source.uri);
        } else {
          setHasError(true);
        }
      }}
      defaultSource={hasError && typeof source === 'number' ? source : undefined}
    />
  );
}

export async function clearImageCache() {
  try {
    const cacheFolder = `${FileSystem.cacheDirectory}images/`;
    await FileSystem.deleteAsync(cacheFolder, { idempotent: true });
    imageCache.clear();
    console.log("Image cache cleared successfully");
  } catch (error) {
    console.error("Error clearing image cache:", error);
  }
}