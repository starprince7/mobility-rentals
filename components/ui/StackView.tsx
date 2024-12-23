import { View } from "react-native";

export function StackView(props: {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
}) {
  const { children, direction = "vertical", className } = props;

  if (direction === "horizontal")
    return (
      <View {...props} className={`${className} flex-row items-center`}>
        {children}
      </View>
    );

  if (direction === "vertical")
    return (
      <View {...props} className={`${className} flex-col justify-center`}>
        {children}
      </View>
    );
}
