import { TouchableOpacity } from "react-native";
import React from "react";
import { FancyText } from "./FancyText";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function NiceButton({ children, className }: Props) {
  return (
    <TouchableOpacity
      className={`${className} bg-black p-5 rounded-[26px] mt-8 w-full`}
    >
      <FancyText className="text-white text-center font-semibold text-xl">
        {children}
      </FancyText>
    </TouchableOpacity>
  );
}
