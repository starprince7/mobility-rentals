import { View, Text } from "react-native";
import React from "react";
import { NiceImage, StackView } from "./ui";

const yellowCar = require("@/assets/images/yellow-car.png");

export function VehicleSummary() {
  return (
    <View className="mx-6 my-3">
      <StackView direction="horizontal" className="justify-between">
        <NiceImage source={yellowCar} className="w-52 h-28 rounded-3xl" />
        <Text className="font-semibold text-lg">2021 Toyota Camry</Text>
      </StackView>
    </View>
  );
}
