import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { ChartPieIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";

import { FancyText, NiceImage, StackView } from "./ui";
import { LocationIndicator } from "./LocationIndicator";

const beetleCar = require("@/assets/images/beetle-car.jpg");
const blueCar = require("@/assets/images/blue-car.webp");
const bmwImage = require("@/assets/images/car-brands/bmw-logo.png");

export function VehicleCard(props: any) {
  const isEven = props.index % 2 == 0;
  return (
    <Link
      href={{ pathname: "/(protected)/details", params: { vehicle: props } }}
      className="flex-1 "
      asChild
    >
      <Pressable>
        <View className={`bg-white rounded-t-xl overflow-hidden mt-2 pb-6 mb-6 flex-1 relative`}>
          <NiceImage
            sharedTransitionTag="123"
            source={beetleCar}
            className="w-full h-72 rounded-xl"
          />
          <View
            className={`bg-transparent rounded-lg py-2 mt-2`}
          >
            <View>
              <FancyText className="text-base text-black mb-0.5 font-semibold">
                Mercedes S Class 2023
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
                  $150
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
                John Doe
              </FancyText>
              <NiceImage source={bmwImage} className="w-5 h-5 self-end" />
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
