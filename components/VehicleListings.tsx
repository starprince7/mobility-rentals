import React from "react";
import { View, useWindowDimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { FancyText } from "./ui";
import { VehicleCard } from "./VehicleCard";


export function VehicleListings() {
  const { width, height } = useWindowDimensions();

  return (
    <View className="mx-6">
      <FancyText className="text-gray-600">Available Cars</FancyText>
      <FlashList
        numColumns={1}
        renderItem={({ item, index }) => <VehicleCard {...(item as any)} index={index} />}
        estimatedItemSize={50}
        data={new Array(10).fill({})}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
