import { Pressable, TextInput, View } from "react-native"
import React from "react"
import {
  FancyInput,
  FancyText,
  FixedBottomView,
  NiceButton,
} from "@/components/ui"
import { Stack, useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { selectVehicleOnboardingStore } from "@/store/vehicle-onboarding-data/reducer"

export default function ListYourVehicleScreen() {
  const router = useRouter()
  const { city, country } = useSelector(
    selectVehicleOnboardingStore,
  )
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText className="text-lg">
              List your car
            </FancyText>
          ),
        }}
      />
      <View className="flex-1 px-6 pt-5">
        <FancyText fontBold className="text-3xl my-2">
          Location
        </FancyText>
        <FancyText className=" my-2">
          Your location is needed to ensure that Lapp is
          part of your area
        </FancyText>
        <FancyText className="mt-3 mb-2">
          Where is your vehicle located?
        </FancyText>
        <Pressable
          onPress={() =>
            router.push(
              "/vehicle-listing-screens/location-finder",
            )
          }
          className="border-zinc-400 border rounded-md p-5"
        >
          <FancyText fontBold>
            {city}
            {(city || country) && ","} {country}
          </FancyText>
        </Pressable>
      </View>
      <FixedBottomView className="absolute h-[100px] pt-3">
        <NiceButton
          disabled={!city || !country}
          href="/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect-license-plate"
        >
          Next
        </NiceButton>
      </FixedBottomView>
    </>
  )
}
