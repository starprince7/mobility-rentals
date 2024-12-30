import { ImageSourcePropType, StyleSheet } from "react-native";
import React from "react";
import { NiceImage } from "./NiceImage";

interface AvatarProps {
  uri?: string;
  localSource?: ImageSourcePropType;
  size: "tiny" | "small" | "large" | "larger";
}

export function Avatar(props: AvatarProps) {
  const { uri, localSource, size } = props;

  const sizeStyle =
    size === "tiny"
      ? styles.tiny
      : size === "small"
      ? styles.small
      : size === "large"
      ? styles.large
      : styles.larger;

  if (localSource) {
    return (
      <NiceImage
        source={localSource}
        style={[sizeStyle]}
        className="rounded-full"
      />
    );
  }

  return (
    <NiceImage source={{ uri }} style={[sizeStyle]} className="rounded-full" />
  );
}

const styles = StyleSheet.create({
  tiny: { width: 27, height: 27 },
  small: { width: 37, height: 37 },
  large: { width: 47, height: 47 },
  larger: { width: 94, height: 94 },
});
