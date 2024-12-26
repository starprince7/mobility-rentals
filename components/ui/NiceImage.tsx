import { Image } from "react-native";
import React, { ComponentProps } from "react";
import Animated from "react-native-reanimated";

export function NiceImage(props: ComponentProps<typeof Animated.Image>) {
  return <Animated.Image {...props} />;
}
