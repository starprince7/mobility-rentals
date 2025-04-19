import React from "react";
import { FancyText, StackView } from "./ui";
import { MapPinIcon } from "react-native-heroicons/solid";
import { TreeCityIcon } from "@/assets/icons";

interface Props {
  className?: string;
  iconColor?: string;
  iconSize?: number;
  value: string[] | string;
}

export function LocationIndicator({
  className,
  value,
  iconColor,
  iconSize,
}: Props) {
  if (!value?.length) return null;
  if (Array.isArray(value))
    return (
      <StackView direction="horizontal" className="gap-2 flex-nowrap">
        <TreeCityIcon size={iconSize || 16} color={iconColor} />
        <FancyText className={`${className} font-bold text-sm`}>
          {value[0]}-{value[1]}
        </FancyText>
      </StackView>
    );
  return (
    <StackView direction="horizontal" className="gap-2 flex-nowrap">
      <TreeCityIcon size={iconSize || 16} color={iconColor} />
      <FancyText className={`${className} font-bold text-sm`}>
        {value}
      </FancyText>
    </StackView>
  );
}
