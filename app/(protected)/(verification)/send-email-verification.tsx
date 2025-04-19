import { SafeAreaView, View } from "react-native"
import React from "react"
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton"
import {
  FancyText,
  FixedBottomView,
  NiceButton,
} from "@/components/ui"
import { router } from "expo-router"

export default function EmailVerification() {
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-gray-200 mb-3">
        <GoBackButtonFloating
          size={20}
          type="close"
          color="black"
          className="top-3 shadow"
        />
        <View className="">
          <FancyText className="text-center py-4 font-bold text-xl">
            Verification
          </FancyText>
        </View>
      </View>
      <View className="flex-1 px-6 pt-2 gap-y-4">
        <FancyText className="text-zinc-800 text-lg">
          This extra step is required to keep our account safe. We'll
          send a code to your email address
        </FancyText>

        <FancyText className="text-zinc-800 text-lg" fontBold>
          johndoe@gmail.com
        </FancyText>
      </View>
      <FixedBottomView className="h-[97px]">
        <NiceButton
          onPress={() =>
            router.push(
              "/(protected)/(verification)/enter-email-verification",
            )
          }
        >
          Email code
        </NiceButton>
      </FixedBottomView>
    </SafeAreaView>
  )
}
