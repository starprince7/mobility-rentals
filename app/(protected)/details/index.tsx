import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FancyText, NiceImageCarousel, StackView } from "@/components/ui";
import { OwnerView } from "@/components";

import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIntoStoreVehicleDetail,
  selectVehicleDetail,
} from "@/store/vehicle-data/reducer";
import { VehicleModel } from "@/components/details-screen/VehicleModelName";
import { Description } from "@/components/details-screen/Description";
import { PriceQuoteFixed } from "@/components/details-screen/PriceQuoteFixed";
import Features from "@/components/details-screen/Features";
import { VehicleBasics } from "@/components/details-screen/VehicleBasics";
import RoadRules from "@/components/details-screen/RoadRules";
import GoBackFloatingButton from "@/components/ui/GoBackFloatingButton";

export default function VehicleDetailScreen() {
  const { vehicleDetail, networkRequestStatus } =
    useSelector(selectVehicleDetail);
  const { id: vechicleId } = useLocalSearchParams();

  // Fetch vehicle detail
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIntoStoreVehicleDetail({ id: vechicleId }) as any);
  }, []);

  if (networkRequestStatus === "loading")
    return (
      <StackView direction="horizontal" className="justify-center flex-1">
        <ActivityIndicator size="large" />
      </StackView>
    );

  const vehicleBasics = {
    numberOfSeats: 2,
    doors: 4,
    ecoFriendly: "hybrid", // | "electric",
    milesPerGallon: 31,
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <GoBackFloatingButton />
      <ScrollView className="flex-1 mb-28">
        <NiceImageCarousel
          images={vehicleDetail?.images}
          className="w-full h-72"
          carouselHeight={250}
        />
        <View className="mx-6 mt-4">
          <FancyText className="text-gray-600">
            Owner id: {vehicleDetail?.ownerId}
          </FancyText>
        </View>
        <VehicleModel
          make={vehicleDetail?.make as string}
          model={vehicleDetail?.model as string}
          year={vehicleDetail?.year as number}
        />
        <VehicleBasics basics={vehicleDetail?.basicFeatures as any} />
        <Features />
        {vehicleDetail?.description && (
          <Description content={vehicleDetail?.description} />
        )}
        <OwnerView
          location={vehicleDetail?.location}
          ownerName={vehicleDetail?.ownerId?.toString() || ""}
        />
        <RoadRules />
      </ScrollView>
      <PriceQuoteFixed price={vehicleDetail?.rentalPricePerDay as number} />
    </SafeAreaView>
  );
}
