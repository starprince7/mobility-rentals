import { View, Text, ScrollView } from "react-native";
import React from "react";
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton";
import { FancyText } from "@/components/ui";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Divider from "@/components/ui/Divider";

export default function ExpandedYouAreCoveredScreen() {
  return (
    <View>
      {/* Hedader start */}
      <View className="bg-gray-200 mb-3">
        <GoBackButtonFloating
          size={20}
          type="close"
          color="black"
          className="top-3 shadow-sm"
        />

        <View className="">
          <FancyText className="text-center py-4 font-bold text-xl">
            More info
          </FancyText>
        </View>
      </View>
      <ScrollView className="px-6 pb-28">
        <View className="my-6 justify-center items-center bg-zinc-200 p-6 rounded-3xl">
          <MaterialCommunityIcons
            name="shield-key-outline"
            size={120}
            color="#a1a1aa"
          />
        </View>
        <FancyText className="text-3xl mb-3" fontBold>
          You're covered
        </FancyText>
        <FancyText className="text-zinc-600">
          Liability insurance is provided under a policy issused to Lapp by
          Travelers Excess and Surplus Lines Company. Terms, conditions, and
          exclusions apply.
        </FancyText>
        {/* Reason 1 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          NGN1.17 billion liability insurance
        </FancyText>
        <FancyText className="text-zinc-600">
          With each protection plan, you're covered by NGN1.17 billion in
          liability insurance protecting you in the rare case someone files a
          lawsuit for injury or property damage that occurs during a trip
        </FancyText>
        {/* Reason 2 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Physical damage protection
        </FancyText>
        <FancyText className="text-zinc-600">
          Choose from a range of protection plans, each with a different level
          of contractual reimbursement from Lapp in the unlikely event your
          vehicle is damaged, stolen or vandalized during a trip.
        </FancyText>
        <FancyText className="text-zinc-600">
          Pick the plan that's right for you, spring for top-tier protection, or
          opt for a lighter plan to pocket more earnings.
        </FancyText>
        {/* Reason 3 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Your personal insurance
        </FancyText>
        <FancyText className="text-zinc-600">
          Your protection plan acts as primary coverage during a trip, so your
          personal insurance shouldn't be affected. You'll still need your own
          insurance for when you drive your vehicle and to satisfy the
          registration requirements in your state
        </FancyText>
        {/* Reason 4 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Appraisals accepted for specialty vehicles
        </FancyText>
        <FancyText className="text-zinc-600">
          If you're listing an eligible specialty vehicle, you can provide, at
          your own expense, an appraisal from an independent source to establish
          the value of your vehicle. Lapp will use the appraisal to determine
          the amount of reimbursement in the event of damage.
        </FancyText>

        <FancyText fontBold className="text-2xl mt-6">
          Protection Plan*
        </FancyText>
        <Divider />
      </ScrollView>
    </View>
  );
}
