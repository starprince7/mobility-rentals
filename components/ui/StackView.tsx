import { ComponentProps } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export function StackView(props: {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  entering?: ComponentProps<typeof Animated.View>["entering"];
  className?: string;
}) {
  const { children, direction = "vertical", className, entering } = props;

  if (direction === "horizontal")
    return (
      <Animated.View
        entering={entering}
        {...props}
        className={`${className} flex-row items-center`}
      >
        {children}
      </Animated.View>
    );

  if (direction === "vertical")
    return (
      <Animated.View
        entering={entering}
        {...props}
        className={`${className} flex-col justify-center`}
      >
        {children}
      </Animated.View>
    );
}
