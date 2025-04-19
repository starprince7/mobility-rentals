import { TouchableOpacity, TouchableWithoutFeedbackProps } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
// Icons
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  onPress?: () => void;
  color?: string;
  size?: number;
  type?: "close" | "back";
  className?: TouchableWithoutFeedbackProps["className"];
}

export default function GoBackButtonFloating({
  onPress,
  className,
  type,
  color = "white",
  size = 26,
}: Props) {
  const router = useRouter();
  const handlePress = () => {
    if (!onPress) router.back();
    else onPress();
  };

  if (type === "close") {
    return (
      <TouchableOpacity
        onPress={handlePress}
        className={`${className} absolute top-16 left-5 z-10 bg-zinc-200/10 p-2 rounded-full`}
      >
        <MaterialIcons name="close" size={size} color={color} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${className} absolute top-16 left-5 z-10 bg-zinc-600/10 p-2 rounded-full`}
    >
      <MaterialIcons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
}
