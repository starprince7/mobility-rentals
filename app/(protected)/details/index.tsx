import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FancyText, NiceButton, NiceImage, StackView } from "@/components/ui";
import { OwnerView, VehicleSpecs } from "@/components";
import { HeartIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartIconOutline } from "react-native-heroicons/outline";
import { Link } from "expo-router";

const yellowCar = require("@/assets/images/yellow-car.png");

export default function VehicleDetailScreen() {
  return (
    <>
      <StatusBar style="light" />
      <ScrollView contentContainerClassName="pb-6" className="flex-1">
        <NiceImage
          sharedTransitionTag="123"
          source={yellowCar}
          className="w-full h-52"
        />
        <VehicleModelName />
        <VehicleSpecs />
        <Description />
        <OwnerView />
      </ScrollView>
      <FixedPriceQuote />
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

function Description() {
  return (
    <View className="mx-6">
      <FancyText className="font-semibold mb-3 text-neutral-500">
        Description
      </FancyText>
      <View className="px-6 border border-neutral-300 bg-neutral-200 py-6 mb-2 mt-1 rounded-3xl">
        <ScrollView className="h-80">
          <FancyText className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
            maiores, optio exercitationem officia, quam cum doloribus aliquid,
            perspiciatis debitis illum placeat tempore asperiores!
            Necessitatibus est eligendi vitae, recusandae expedita
            exercitationem. Similique hic commodi deleniti quod placeat
            blanditiis magni maiores aliquam reiciendis quos recusandae, atque
            earum!
          </FancyText>
        </ScrollView>
      </View>
    </View>
  );
}

function FixedPriceQuote() {
  return (
    <StackView
      direction="horizontal"
      className="pb-8 justify-between items-baseline px-6"
    >
      <StackView direction="horizontal" className="gap-1.5">
        <FancyText className="text-3xl font-bold">$150</FancyText>
        <FancyText className="text-sm text-neutral-500">/ 1 Day</FancyText>
      </StackView>
      <Link asChild href='/(protected)/booking'>
        <NiceButton className="w-52">Rent</NiceButton>
      </Link>
    </StackView>
  );
}
