import { View, Text, ScrollView, Platform } from "react-native";
import React from "react";
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton";
import { FancyText } from "@/components/ui";
import Octicons from "@expo/vector-icons/Octicons";
import Divider from "@/components/ui/Divider";
import CloseFloatingButton from "@/components/ui/CloseFloatingButton";

export default function ExpandedHowItWorksScreen() {
  const isAndroid = Platform.OS === "android";
  return (
    <View>
      {/* Hedader start */}
      <View className="bg-gray-200 mb-3">
        <CloseFloatingButton color="black" className={isAndroid ? "right-6 top-16" : "right-6 top-5"} size={22}/>

        <View className="">
          <FancyText className="text-center py-4 font-bold text-xl">
            More info
          </FancyText>
        </View>
      </View>
      <ScrollView className="px-6 pb-28">
        <View className="my-6 justify-center items-center bg-zinc-200 p-6 rounded-3xl">
          <Octicons name="tools" size={120} color="#a1a1aa" />,
        </View>
        <FancyText className="text-3xl mb-3" fontBold>
          How it works
        </FancyText>
        {/* Reason 1 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          List your vehicle for free
        </FancyText>
        <FancyText className="text-zinc-600">
          Share your truck, sports car, or anything in between. Listing takes
          about 10 minutes and is free - no sign-up charges, no monthly fees.
        </FancyText>
        {/* Reason 2 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Set your price & rules
        </FancyText>
        <FancyText className="text-zinc-600">
          Set your own daily price, or let your price automatically adjust to
          match demand. Customize when your vehicle is available and lay your
          own ground rules. Also choose how you interact with guests - you can
          meet them in person or offer self check-in. You're always in control,
          and we're here to help.
        </FancyText>
        {/* Reason 3 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Welcome your guests
        </FancyText>
        <FancyText className="text-zinc-600">
          When a qualified guest books your vehicle, you'll confirm pickup
          details before their trip. Guests usually pick up at your home
          location, but you can also deliver to them to earn even more.
        </FancyText>
        <FancyText className="text-zinc-600">
          When the trip starts, simply check them in with the Lapp app, then sit
          back and relax until the trip is over.
        </FancyText>
        {/* Reason 4 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Get paid
        </FancyText>
        <FancyText className="text-zinc-600">
          Get paid via direct deposit within three days after each trip. You'll
          earn 60% - 90% of the trip price, depending on the protection plan you
          choose. You'll also get reimbursed for things like fuel and any
          mileage beyound your limit.
        </FancyText>

        <Divider />
      </ScrollView>
    </View>
  );
}
