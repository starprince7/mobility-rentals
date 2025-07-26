import { View, Text, ScrollView } from "react-native"
import React from "react"
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton"
import { FancyText } from "@/components/ui"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import CloseFloatingButton from "@/components/ui/CloseFloatingButton"
import { Platform } from "react-native"

export default function ExpandedWeGotYourBack() {
  const isAndroid = Platform.OS === "android"
  return (
    <View>
      {/* Hedader start */}
      <View className="bg-gray-200 mb-3">
        <CloseFloatingButton
          color="black"
          className={isAndroid ? "right-6 top-16" : "right-6 top-5"}
          size={22}
        />

        <View className="">
          <FancyText className="text-center py-4 font-bold text-xl">More info</FancyText>
        </View>
      </View>
      <ScrollView className="px-6">
        <View className="my-6 justify-center items-center bg-zinc-200 p-6 rounded-3xl">
          <MaterialCommunityIcons name="account-convert-outline" size={120} color="#a1a1aa" />
        </View>
        <FancyText className="text-3xl mb-3" fontBold>
          We've got your back
        </FancyText>
        {/* Reason 1 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Safe & trusted community
        </FancyText>
        <FancyText className="text-zinc-600">
          Before booking, every guest must provide a valid driver's license, verified phone
          number, and other information. In addition, Lapp screens every guest using advanced risk
          scoring to ensure they're trustworthy.
        </FancyText>
        {/* Reason 2 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          24/7 customer support
        </FancyText>
        <FancyText className="text-zinc-600">
          The Lapp support team is standing by 24/7 to assist you and your guests by phone, email,
          and live chat, and guest have access to 24/7 roadside assistance.
        </FancyText>
        {/* Reason 3 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Two-way reviews
        </FancyText>
        <FancyText className="text-zinc-600">
          Hosts and guests review each other after every trip, so you see your guest's reviews
          before hosting them.
        </FancyText>
        {/* Reason 4 */}
        <FancyText fontBold className="mt-5 mb-0.5 text-lg">
          Rules of the road
        </FancyText>
        <FancyText className="text-zinc-600">
          Lapp has strict community standards and expects all guest to care for your vehicle as if
          it were their own. Plus, you can set custom ground rules for your vehicle.
        </FancyText>
      </ScrollView>
    </View>
  )
}
