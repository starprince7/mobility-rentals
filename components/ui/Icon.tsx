import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleProp, TextStyle, OpaqueColorValue } from "react-native";
import React, { ComponentProps, ComponentType } from "react";

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number | undefined;
  style?: StyleProp<TextStyle>;
  name: ComponentProps<ComponentType<typeof MaterialIcons>>["name"];
}

export function Icon({ name, color, size, style }: Props) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={name as any}
      style={style}
    />
  );
}
