import { View } from "react-native";
import React from "react";
import { FancyText, StackView } from "./ui";
import { getDaysBetweenDates } from "@/utils";

export function PriceDetails() {
  const { days } = getDaysBetweenDates(
    "2024-12-24T02:32:07.684Z",
    "2024-12-26T02:39:00.000Z"
  );

  return (
    <View className=" border border-gray-300 rounded-[30px] mx-6 bg-neutral-200 p-6">
      <FancyText className="text-xl font-bold mb-4">Price details</FancyText>
      <StackView direction="vertical" className="justify-between gap-y-5">
        <StackView direction="horizontal" className="justify-between">
          <FancyText className="text-gray-900">
            Base Price x {days} day
          </FancyText>
          <FancyText className="text-gray-900">$100</FancyText>
        </StackView>
        <StackView direction="horizontal" className="justify-between">
          <FancyText className="text-gray-900">Service fee</FancyText>
          <FancyText className="text-gray-900">$15</FancyText>
        </StackView>
        <View className="border-b border-gray-300" />
        <StackView direction="horizontal" className="justify-between">
          <FancyText className="text-gray-900 text-lg">Total(USD)</FancyText>
          <FancyText className="text-gray-900 font-medium text-lg">$115</FancyText>
        </StackView>
      </StackView>
    </View>
  );
}
