import { View, FlatList } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FancyText } from "@/components/ui";
import { useSelector } from "react-redux";
import { selectVehicleDetail } from "@/store/vehicle-data/reducer";

import getIconForFeature from "@/components/details-screen/utils";

export default function FeaturesScreen() {
  const { vehicleDetail } = useSelector(selectVehicleDetail);

  console.log(
    "vehicleDetail.advancedFeatures features::=>",
    vehicleDetail?.advancedFeatures
  );

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText className="text-lg">Features</FancyText>
          ),
        }}
      />
      <FlatList
        contentContainerClassName="mt-3"
        keyExtractor={(item) => item.label}
        data={vehicleDetail?.advancedFeatures}
        renderItem={({ item }) => (
          <View className="flex-row items-center p-4 border-b border-gray-200">
            <View className="mr-3">{getIconForFeature(item.label)}</View>
            <FancyText>{item.label}</FancyText>
          </View>
        )}
      />
    </View>
  );
}
