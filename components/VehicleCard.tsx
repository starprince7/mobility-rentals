import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { ChartPieIcon } from "react-native-heroicons/solid";

import { FancyText, NiceImage, NiceImageCarousel, StackView } from "./ui";
import { LocationIndicator } from "./LocationIndicator";
import { IAvailableVehicles } from "@/types";

const beetleCar = require("@/assets/images/beetle-car.jpg");
const blueCar = require("@/assets/images/blue-car.webp");
const bmwImage = require("@/assets/images/car-brands/bmw-logo.png");

export function VehicleCard(props: IAvailableVehicles & { index: number }) {
  const isEven = props.index % 2 == 0;
  return (
    <Link
      href={{ pathname: "/(protected)/details", params: props as any }}
      className="flex-1 "
      asChild
    >
      <Pressable>
        <View
          className={`bg-white rounded-t-xl overflow-hidden mt-2 pb-6 mb-6 flex-1 relative`}
        >
          <NiceImageCarousel
            carouselHeight={250}
            images={props.images}
            className="w-full h-72 rounded-xl border border-gray-100"
          />
          {/* <NiceImage
            sharedTransitionTag="123"
            source={{ uri: props.images[1] }}
            className="w-full h-72 border border-green-600 rounded-xl"
          /> */}
          <View className={`bg-transparent rounded-lg py-2 mt-2`}>
            <View>
              <FancyText className="text-base text-black mb-0.5 font-semibold">
                {props.make} {props.model} {props.year}
              </FancyText>
              <LocationIndicator
                value={"Lagos"}
                iconSize={12}
                iconColor="#737373"
                className="text-neutral-500 font-thin"
              />
            </View>
            {/*  */}
          </View>
          <View className="h-10 flex-1 w-full">
            <StackView direction="horizontal" className="justify-between">
              <StackView direction="horizontal">
                <FancyText className="font-bold text-lg text-[#23666B]">
                  ${props.rentalPricePerDay}
                </FancyText>
                <FancyText className="text-neutral-400 text-xs">
                  {" "}
                  / 1 day
                </FancyText>
              </StackView>
              <FancyText
                className="text-xs"
                startIcon={<ChartPieIcon size={13} />}
              >
                60mph
              </FancyText>
            </StackView>

            <StackView direction="horizontal" className="gap-1 items-center">
              <FancyText className="text-xs mt-2 text-neutral-600">
                {props.owner?.name}
              </FancyText>
              <NiceImage
                source={bmwImage}
                style={{ width: 20, height: 20 }}
                className="w-5 h-5 self-end"
              />
            </StackView>
          </View>
        </View>
      </Pressable>
    </Link>
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
