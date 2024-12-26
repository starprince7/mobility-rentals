import { View } from "react-native";
import React from "react";
import { FancyText } from "@/components/ui";
import { VehicleSummary, DateRangePicker, PriceDetails } from "@/components";

export default function Booking() {
  return (
    <View className="flex-1">
      <View className="border border-neutral-200 p-3 items-center">
        <View className="bg-neutral-300 w-12 mb-6 rounded-full p-1" />
        <FancyText className="text-gray-900 text-xl mb-3 font-semibold">
          Request Booking
        </FancyText>
      </View>
      <VehicleSummary />
      <View className="border-b border-neutral-200 my-2 mx-6" />
      <DateRangePicker />
      <PriceDetails />
    </View>
  );
}
