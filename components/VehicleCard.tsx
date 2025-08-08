import { Link } from "expo-router";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { ChartPieIcon } from "react-native-heroicons/solid";
import Animated from "react-native-reanimated";
import React from "react";

import { FancyText, NiceImage, NiceImageCarousel, StackView } from "./ui";
import { LocationIndicator } from "./LocationIndicator";
import { IVehicle } from "@/types";
import { formatToCurrency } from "@/utils";

const beetleCar = require("@/assets/images/beetle-car.jpg");
const blueCar = require("@/assets/images/blue-car.webp");
const bmwImage = require("@/assets/images/car-brands/bmw-logo.png");

export function VehicleCard(props: IVehicle & { index: number }) {
  const isEven = props.index % 2 == 0;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // Determine a cover image to pass via params for immediate render on details screen
  const imagesArray = Array.isArray(props.images)
    ? props.images
    : typeof props.images === "string"
    ? (props.images as string).split(",")
    : [];
  const coverImage = imagesArray?.[0];
  return (
    <View
      className={`bg-white border-b border-gray-200 rounded-xl overflow-hidden mt-2 pb-6 mb-6 flex-1 relative`}
    >
      <Link
        href={{
          pathname: "/(protected)/details",
          params: { ...(props as any), coverImage, selectedIndex: currentIndex },
        }}
        className="flex-1 "
        asChild
      >
        <Pressable>
          <NiceImageCarousel
            // Attach tag directly to the actual image element used by the carousel
            sharedTransitionTag={`vehicle-image-${String((props as any)._id)}`}
            initialIndex={0}
            onIndexChange={(i) => setCurrentIndex(i)}
            carouselHeight={250}
            images={props.images}
            className="w-full h-72 rounded-xl border border-gray-100"
          />

          <View className={`bg-transparent rounded-lg py-2 px-2 mt-3`}>
            <View>
              <FancyText className="text-2xl tracking-wide text-zinc-700 mb-3 font-bold">
                {props.make} {props.model} {props.year}
              </FancyText>
              <LocationIndicator
                value={[props.location.city, props.location.country]}
                iconSize={18}
                iconColor="#a1a1aa"
                className="text-zinc-500 font-thin"
              />
            </View>
            {/*  */}
          </View>
        </Pressable>
      </Link>
      {/* <View className="h-12 flex-1 px-4 border mt-2"> */}
      <StackView
        direction="horizontal"
        className="flex-1 top-3 right-6 absolute justify-end border-zinc-200 rounded-lg"
      >
        <StackView
          direction="horizontal"
          className="justify-end min-w-24 items-end rounded-lg bg-[#23666B]/95 px-3 py-1"
        >
          <FancyText
            style={{ fontFamily: "Ledger" }}
            className="font-bold text-base text-zinc-100 tracking-widest"
          >
            {formatToCurrency(props.rentalPricePerDay, "NGN")}000
          </FancyText>
          <FancyText
            style={{ fontFamily: "Ledger" }}
            className="text-zinc-50 text-base items-start tracking-widest"
          >
            {/* {" "} */}
            /day
          </FancyText>
        </StackView>
      </StackView>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  topGradient: {
    flex: 1,
    height: 60,
  },
  rightGradient: {
    flex: 1,
    height: 60,
  },
});
