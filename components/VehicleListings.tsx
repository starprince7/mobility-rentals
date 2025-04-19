import React from "react";
import { ActivityIndicator, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { FancyText, StackView } from "./ui";
import { VehicleCard } from "./VehicleCard";
import { useVehicleListing } from "@/hooks";
import { IVehicle } from "@/types";

export function VehicleListings() {
  const { data, isLoading } = useVehicleListing();

  if (isLoading)
    return (
      <StackView direction="vertical" className="justify-center mt-40">
        <ActivityIndicator />
      </StackView>
    );

  return (
    <View className="mx-6">
      <FancyText
        className="text-gray-600 font-extrabold"
        style={{ fontWeight: "900" }}
      >
        Available Cars
      </FancyText>
      <FlashList
        numColumns={1}
        renderItem={({ item, index }) => (
          <VehicleCard {...(item as unknown as IVehicle)} index={index} />
        )}
        estimatedItemSize={5}
        data={data}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
