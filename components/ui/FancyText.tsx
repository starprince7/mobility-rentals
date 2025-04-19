import { Text, View, FlexStyle, Platform, StyleSheet } from "react-native";
import React, { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Text> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  justifyContent?: FlexStyle["justifyContent"];
  alignItems?: FlexStyle["alignItems"];
  iosFontFamily?: string;
  androidFontFamily?: string;
  fontBold?: boolean;
}

export function FancyText(props: Props) {
  const {
    startIcon,
    endIcon,
    children,
    justifyContent = "flex-start",
    alignItems = "center",
    style,
    fontBold,
    iosFontFamily = "AtypTextMedium",
    androidFontFamily = "AtypDisplayMedium",
    ...restProps
  } = props;

  // Determine if bold styling is requested through style prop
  const styleObj = StyleSheet.flatten(style || {});
  const isBoldStyle =
    styleObj.fontWeight === "bold" ||
    styleObj.fontWeight === 600 ||
    styleObj.fontWeight === 700 ||
    styleObj.fontWeight === 800;

  // Use AtypDisplaySemiBold when bold styling is requested
  const fontFamily =
    isBoldStyle || fontBold
      ? "AtypDisplaySemiBold"
      : Platform.OS === "android"
      ? androidFontFamily
      : iosFontFamily;

  // Styles
  const styles = {
    fancyText: {
      fontFamily,
    },
  };

  const containerStyle = {
    flexDirection: "row" as const,
    justifyContent,
    alignItems,
    gap: 8, // equivalent to gap-2 in tailwind
  };

  // Render start icon if it exists
  if (startIcon) {
    return (
      <View style={containerStyle}>
        <Text style={[styles.fancyText, style]}>{startIcon}</Text>
        <Text style={[styles.fancyText, style]} {...restProps}>
          {children}
        </Text>
      </View>
    );
  }

  // Render end icon
  if (endIcon) {
    return (
      <View style={containerStyle}>
        <Text style={[styles.fancyText, style]} {...restProps}>
          {children}
        </Text>
        <Text style={[styles.fancyText, style]}>{endIcon}</Text>
      </View>
    );
  }

  // Default: Render text
  return (
    <Text style={[styles.fancyText, style]} {...restProps}>
      {children}
    </Text>
  );
}
