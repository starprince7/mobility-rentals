import { Text, View } from "react-native";
import React, { ReactElement } from "react";
import { FancyText } from "../ui";
import { formatToCurrency } from "@/utils";
import { KeepCleanIcon, OffRoadIcon, OffRoadTruckIcon, SmokeFreeIcon } from "@/assets/icons";

// Define interfaces for our data structures
interface RuleItem {
  rule: string;
  details: string;
  icon: ReactElement;
}

// Define icon component props type
interface IconProps {
  size: number;
  color: string;
}

// Define the rules template
const rules_template: RuleItem[] = [
  {
    rule: "No smoking allowed",
    details: `Smoking in any Blockride vehicle will result in a ${formatToCurrency(
      50000,
      "NGN"
    )} fine`,
    icon: <SmokeFreeIcon size={26} color="black" />,
  },
  {
    rule: "Vehicle must be clean",
    details: `A ${formatToCurrency(
      50000,
      "NGN"
    )} cleaning fee will be charged for spills`,
    icon: <KeepCleanIcon size={26} color="black" />,
  },
  {
    rule: "No off-roading",
    details: ``,
    icon: <OffRoadTruckIcon size={26} color="black" />,
  },
];

const RoadRules: React.FC = () => {
  return (
    <View className="mx-6 mt-8 mb-3 bg-zinc-200 px-5 py-8 rounded-[30px] border border-zinc-300">
      <FancyText className="uppercase tracking-wide text-zinc-500 text-sm mb-4 font-bold">
        Rules of the road
      </FancyText>

      {rules_template.map((ruleItem, index) => (
        <View key={index} className="flex-row gap-5 items-center mb-4">
          {/* Icon */}
          {ruleItem.icon}

          {/* Text */}
          <View className="gap-1 flex-1">
            <FancyText className="text-xl">{ruleItem.rule}</FancyText>
            {ruleItem.details && (
              <FancyText className="text-base text-gray-500">
                {ruleItem.details}
              </FancyText>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default RoadRules;
