import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { NiceImageCarousel, StackView } from "./ui";
import { selectVehicleDetail } from "@/store/vehicle-data/reducer";

export function VehicleSummary() {
  const { networkRequestStatus, vehicleDetail } =
    useSelector(selectVehicleDetail);
  return (
    <View className="mx-6 my-3">
      <StackView direction="horizontal" className="gap-5">
        <NiceImageCarousel
          images={vehicleDetail?.images}
          className="w-52 h-28 rounded-3xl"
        />
        <Text className="font-semibold text-lg">
          {vehicleDetail?.make} {vehicleDetail?.model} {vehicleDetail?.year}
        </Text>
      </StackView>
    </View>
  );
}
