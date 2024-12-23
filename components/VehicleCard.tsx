import { Pressable, View } from "react-native";
import { FancyText, NiceImage, StackView } from "./ui";
import { LocationIndicator } from "./LocationIndicator";
import { ChartPieIcon } from "react-native-heroicons/solid";
import { Link } from "expo-router";

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
        <View
          className={`bg-white rounded-lg py-2 px-3 mt-2 flex-1 ${
            isEven ? "mr-1" : "ml-1"
          }`}
        >
          <NiceImage source={blueCar} className="w-40 h-40" />
          <View>
            <FancyText className="text-base text-neutral-600 mb-0.5 font-semibold">
              Mercedes S Class 2023
            </FancyText>
            <LocationIndicator
              iconSize={12}
              iconColor="#a3a3a3"
              className="text-neutral-400 font-thin text-xs mb-2"
            />
          </View>
          {/*  */}
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
            <FancyText className="text-xs mt-2 text-neutral-500">
              John Doe
            </FancyText>
            <NiceImage source={bmwImage} className="w-5 h-5 self-end" />
          </StackView>
        </View>
      </Pressable>
    </Link>
  );
}
