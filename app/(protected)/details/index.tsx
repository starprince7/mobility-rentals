import React from "react";
import { View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Avatar,
  FancyText,
  NiceButton,
  NiceImage,
  StackView,
} from "@/components/ui";
import { LocationIndicator, OwnerView, VehicleSpecs } from "@/components";
import { HeartIcon } from "react-native-heroicons/solid";
import {
  HeartIcon as HeartIconOutline,
  TicketIcon,
} from "react-native-heroicons/outline";

const yellowCar = require("@/assets/images/yellow-car.png");

export default function VehicleDetailScreen() {
  return (
    <>
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <NiceImage source={yellowCar} className="w-full h-52" />
        <VehicleModelName />
        <VehicleSpecs />
        <PickupAndDropOffUiView />
        <OwnerView />
        <FixedPriceQuote />
      </ScrollView>
    </>
  );
}

function VehicleModelName() {
  return (
    <View className="mx-6 my-6">
      <FancyText
        className="font-bold text-2xl"
        endIcon={<LoveButton />}
        justifyContent="space-between"
      >
        2021 Toyota Camry
      </FancyText>
    </View>
  );
}

function LoveButton() {
  const [isLoved, setIsLoved] = React.useState(false);

  const handleLike = () => {
    setIsLoved((prev) => !prev);
  };

  if (!isLoved)
    return (
      <Pressable onPress={handleLike}>
        <HeartIconOutline color="black" />
      </Pressable>
    );
  if (isLoved)
    return (
      <Pressable onPress={handleLike}>
        <HeartIcon color="black" />
      </Pressable>
    );
}





function PickupAndDropOffUiView() {
  return (
    <View className="mx-6 px-6 bg-neutral-300 py-6 mb-2 mt-1 rounded-3xl">
      <FancyText className="font-semibold text-xl">
        Pick up and Drop off
      </FancyText>
      <LocationIndicator
        iconSize={14}
        iconColor="#737373"
        value={["Lagos, Nigeria", "Oriental Hotel, Lekki."]}
        className="font-normal mt-1 text-neutral-500"
      />
    </View>
  );
}

function FixedPriceQuote() {
  return (
    <StackView direction="horizontal">
      <FancyText>$150 / day</FancyText>
      <FancyText>$150 / day</FancyText>
    </StackView>
  );
}
