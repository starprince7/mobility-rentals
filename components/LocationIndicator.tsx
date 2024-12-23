import React from "react";
import { FancyText, StackView } from "./ui";
import { MapPinIcon } from "react-native-heroicons/solid";

interface Props {
  className?: string;
  iconColor?: string;
  iconSize?: number;
  value: string[];
}

export function LocationIndicator({
  className,
  value,
  iconColor,
  iconSize,
}: Props) {
  if (!value?.length) return null;
  return (
    <StackView direction="horizontal" className="gap-1.5">
      <MapPinIcon size={iconSize || 16} color={iconColor} />
      <FancyText className={`${className} font-bold text-sm`}>
        {value[0]}-{value[1]}
      </FancyText>
    </StackView>
  );
}
