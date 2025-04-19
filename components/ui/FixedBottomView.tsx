import { View } from "react-native";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function FixedBottomView({ children, className }: Props) {
  return (
    <View
      className={`${className} bg-white w-full absolute pt-3 bottom-0 px-6`}
    >
      {children}
    </View>
  );
}
