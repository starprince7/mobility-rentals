import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import React from "react";
import { FancyText } from "./FancyText";

interface Props {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "large";
  onPress?: (event: GestureResponderEvent) => void;
}

export const NiceButton = React.forwardRef<View, Props>(
  ({ children, className = "", size = "large", onPress, ...props }, ref) => {
    const baseClasses = "bg-black p-5 mt-8";
    const sizeClasses = size === "large" ? "rounded-[30px]" : "rounded-[26px]";
    const textClasses = `text-white text-center font-semibold ${
      size === "large" ? "text-xl" : ""
    }`;

    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        onPress={onPress}
        className={`${baseClasses} ${sizeClasses} ${className}`}
      >
        <FancyText className={textClasses}>{children}</FancyText>
      </TouchableOpacity>
    );
  }
);

NiceButton.displayName = "NiceButton";
