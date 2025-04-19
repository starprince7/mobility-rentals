import { Text, View } from "react-native";
import { FancyText, StackView } from "../ui";
import {
  ArrowLeftEndOnRectangleIcon,
  CubeIcon,
  Cog6ToothIcon,
} from "react-native-heroicons/outline";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BasicInfo } from "./BasicInfo";
import { CarSeatIcon } from "@/assets/icons";
import getIconForFeature from "./utils";

interface IVehicleBasics {
  numberOfSeats: number;
  doors: number;
  ecoFriendly: "hybrid" | "electric" | "engine";
  milesPerGallon: 31;
}

type Props = {
  basics: IVehicleBasics;
};
export function VehicleBasics({ basics }: Props) {
  return (
    <View className="mx-6 mb-2 border-t-2 border-neutral-200 pt-5">
      <FancyText className="tracking-wide font-bold uppercase text-sm text-zinc-500 mb-2 pb-1">
        Vehicle Basics
      </FancyText>

      {/* Rendering List here */}
      <Animated.ScrollView
        entering={FadeInDown.delay(100).duration(300).springify().damping(13)}
        className={`rounded-[45px] flex-1 border border-neutral-200 px-5 pb-2.5 pt-2.5`}
        showsVerticalScrollIndicator={false}
      >
        <StackView
          direction="horizontal"
          className="justify-center text-gray-800 gap-8"
        >
          <BasicInfo
            label="Seats"
            data={basics?.numberOfSeats}
            icon={() => <CarSeatIcon color="#1f2937" size={28} />}
          />
          <BasicInfo
            label="Doors"
            data={basics?.doors}
            icon={() => (
              <ArrowLeftEndOnRectangleIcon color="#1f2937" size={28} />
            )}
          />
          <BasicInfo
            label=""
            data={basics?.ecoFriendly}
            icon={() => getIconForFeature(basics?.ecoFriendly)!}
          />
          <BasicInfo
            label="MPG"
            data={basics?.milesPerGallon}
            icon={() => <CubeIcon color="#1f2937" size={28} />}
          />
        </StackView>
      </Animated.ScrollView>
    </View>
  );
}
