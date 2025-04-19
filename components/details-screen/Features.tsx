import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FancyText, StackView } from "../ui";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { selectVehicleDetail } from "@/store/vehicle-data/reducer";
import getIconForFeature from "./utils";

export default function Features() {
  const { vehicleDetail } = useSelector(selectVehicleDetail);
  // Only show first 8 features
  const visibleFeatures = vehicleDetail?.advancedFeatures.slice(0, 5);
  // Calculate remaining features count
  const remainingCount = vehicleDetail?.advancedFeatures.length
    ? Math.max(0, vehicleDetail?.advancedFeatures.length - 5)
    : 0;

  return (
    <View className="mx-6 my-3">
      <FancyText className="uppercase font-bold text-zinc-500 text-sm tracking-wide">
        Features
      </FancyText>
      <View className="flex-row items-center mt-4">
        <StackView
          direction="horizontal"
          className="gap-6 justify-center flex-1"
        >
          {!!visibleFeatures?.length &&
            visibleFeatures.map((feat, index) => (
              <View key={index} className="rounded-full p-2.5 bg-zinc-200">
                {getIconForFeature(feat.label)}
              </View>
            ))}
        </StackView>

        {true && (
          <Link
            href={{
              pathname: "/(protected)/details/features",
            }}
            asChild
          >
            <TouchableOpacity className="bg-zinc-200 px-4 py-1.5 rounded-lg ml-2">
              <FancyText className="font-medium">
                See {!remainingCount ? "" : `${remainingCount} `}more
              </FancyText>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
}
