import { View } from "react-native";
import { FancyText, StackView } from "./ui";
import {
  TicketIcon,
  CogIcon,
  FireIcon,
  BoltIcon,
  GlobeEuropeAfricaIcon,
  Squares2X2Icon as SeatsIcon,
  RectangleStackIcon,
  StopCircleIcon,
  SwatchIcon,
  MapPinIcon,
  WrenchScrewdriverIcon,
} from "react-native-heroicons/outline";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeInDown } from "react-native-reanimated";

const carSpecs = [
  {
    label: "Engine",
    value: "4.4L - 320hp",
    icon: <TicketIcon color="#171717" />,
  },
  {
    label: "Transmission",
    value: "Automatic",
    icon: <CogIcon color="#171717" />,
  },
  { label: "Fuel Type", value: "Petrol", icon: <FireIcon color="#171717" /> },
  {
    label: "Year",
    value: "2021",
    icon: <WrenchScrewdriverIcon color="#171717" />,
  },
  { label: "Color", value: "Yellow", icon: <SwatchIcon color="#171717" /> },
  {
    label: "Mileage",
    value: "20,000",
    icon: <GlobeEuropeAfricaIcon color="#171717" />,
  },
  { label: "Seats", value: "5", icon: <SeatsIcon color="#171717" /> },
  { label: "Doors", value: "4", icon: <RectangleStackIcon color="#171717" /> },
  {
    label: "Drive Type",
    value: "FWD",
    icon: <StopCircleIcon color="#171717" />,
  },
  { label: "Top Speed", value: "220mph", icon: <BoltIcon color="#171717" /> },
  {
    label: "Location",
    value: "Lagos, Nigeria",
    icon: <MapPinIcon color="black" />,
  },
];

export function VehicleSpecs() {
  return (
    <View className="mx-6 mb-2 border-t-2 border-neutral-200 pt-2">
      <FancyText className="font-semibold text-neutral-400 mb-3 pb-2">
        Vehicle Specs
      </FancyText>

      {/* Rendering List here */}
      <FlashList
        numColumns={2}
        renderItem={({ item, index }) => (
          <SpecCard {...(item as any)} index={index} />
        )}
        estimatedItemSize={50}
        data={carSpecs}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

interface SpecCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  index: number;
}
function SpecCard({ icon, label, value, index }: SpecCardProps) {
  const isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(300)
        .springify()
        .damping(13)}
      className={`${
        isEven ? "mr-2" : "ml-2"
      } mb-3 bg-neutral-200 w-44 rounded-[26px] flex-1 border border-neutral-300 px-5 py-4`}
    >
      <StackView direction="horizontal" className="gap-2">
        <View className="items-center">
          <View className="rounded-full bg-white p-1 self-start">
            {icon || <TicketIcon color="black" />}
          </View>
        </View>
        <FancyText className="my-2 text-neutral-500 text-sm">
          {label || "Engine"}
        </FancyText>
      </StackView>
      <FancyText className="text-lg self-end mt-6">
        {value || "4.4L - 320hp"}
      </FancyText>
    </Animated.View>
  );
}
