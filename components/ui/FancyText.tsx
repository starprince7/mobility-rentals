import { Text, View, FlexStyle, Platform } from "react-native";
import React, { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Text> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  justifyContent?: FlexStyle["justifyContent"];
  alignItems?: FlexStyle["alignItems"];
}

export function FancyText(props: Props) {
  const {
    startIcon,
    endIcon,
    children,
    justifyContent = "flex-start",
    alignItems = "center",
    style,
    ...restProps
  } = props;

  const containerStyle = {
    flexDirection: "row" as const,
    justifyContent,
    alignItems,
    gap: 4, // equivalent to gap-1 in tailwind
  };

  // Render start icon if it exists
  if (startIcon) {
    return (
      <View style={containerStyle}>
        <Text {...restProps} style={[styles.fancyText, style]}>
          {startIcon}
        </Text>
        <Text {...restProps} style={[styles.fancyText, style]}>
          {children}
        </Text>
      </View>
    );
  }

  // Render end icon
  if (endIcon) {
    return (
      <View style={containerStyle}>
        <Text {...restProps} style={[styles.fancyText, style]}>
          {children}
        </Text>
        <Text {...restProps} style={[styles.fancyText, style]}>
          {endIcon}
        </Text>
      </View>
    );
  }

  // Default: Render text
  return (
    <Text {...restProps} style={[styles.fancyText, style]}>
      {children}
    </Text>
  );
}

const styles = {
  fancyText: {
    fontFamily: Platform.OS === "android" ? "Ledger" : "Poppins",
  },
};
