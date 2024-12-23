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
  CalendarIcon,
  CalendarDaysIcon,
  WrenchScrewdriverIcon
} from "react-native-heroicons/outline";
import { FlashList } from "@shopify/flash-list";

const carSpecs = [
  {
    label: "Engine",
    value: "4.4L - 320hp",
    icon: <TicketIcon color="#737373" />,
  },
  {
    label: "Transmission",
    value: "Automatic",
    icon: <CogIcon color="#737373" />,
  },
  { label: "Fuel Type", value: "Petrol", icon: <FireIcon color="#737373" /> },
  { label: "Year", value: "2021", icon: <WrenchScrewdriverIcon color="#737373" /> },
  { label: "Color", value: "Yellow", icon: <SwatchIcon color="#737373" /> },
  { label: "Mileage", value: "20,000", icon: <GlobeEuropeAfricaIcon color="#737373" /> },
  { label: "Seats", value: "5", icon: <SeatsIcon color="#737373" /> },
  { label: "Doors", value: "4", icon: <RectangleStackIcon color="#737373" /> },
  { label: "Drive Type", value: "FWD", icon: <StopCircleIcon color="#737373" /> },
  { label: "Top Speed", value: "220mph", icon: <BoltIcon color="#737373" /> },
  {
    label: "Location",
    value: "Lagos, Nigeria",
    icon: <TicketIcon color="black" />,
  },
];

export function VehicleSpecs() {
  return (
    <View className="mx-6 mb-2 border-t-2 border-neutral-200 pt-2">
      <FancyText className="font-semibold text-neutral-400 mb-3 pb-2">
        Vehicle Specs
      </FancyText>

      {/* Spec Info Card */}
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
    <View
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
      <FancyText className="text-lg self-end mt-6">{value || "4.4L - 320hp"}</FancyText>
    </View>
  );
}
