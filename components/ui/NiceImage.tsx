import { Image } from "react-native";
import React, { ComponentProps } from "react";

export function NiceImage(props: ComponentProps<typeof Image>) {
  return <Image {...props} />;
}
