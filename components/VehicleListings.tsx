import React from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { FancyText } from "./ui";
import { VehicleCard } from "./VehicleCard";
import { useVehicleListing } from "@/hooks";
import { IAvailableVehicles } from "@/types";

export function VehicleListings() {
  const { data } = useVehicleListing();

  return (
    <View className="mx-6">
      <FancyText className="text-gray-600">Available Cars</FancyText>
      <FlashList
        numColumns={1}
        renderItem={({ item, index }) => (
          <VehicleCard
            {...(item as unknown as IAvailableVehicles)}
            index={index}
          />
        )}
        estimatedItemSize={5}
        data={data}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
