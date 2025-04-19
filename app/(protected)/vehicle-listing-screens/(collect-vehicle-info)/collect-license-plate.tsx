import React from "react"
import { Stack, useRouter } from "expo-router"
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  SafeAreaView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

import {
  FancyText,
  FixedBottomView,
  NiceButton,
  StackView,
} from "@/components/ui"
import {
  selectVehicleOnboardingStore,
  setLicensePlate,
} from "@/store/vehicle-onboarding-data/reducer"

export default function CollectLicensePlateScreen() {
  const inputRef = React.useRef<TextInput>(null)

  const router = useRouter()
  const dispatch = useDispatch()

  const { licensePlate } = useSelector(selectVehicleOnboardingStore)

  const handleInputFocus = () => {
    inputRef.current?.focus()
  }

  // Handle text change by dispatching to Redux
  const handleTextChange = (text: string) => {
    dispatch(setLicensePlate(text.toUpperCase()))
  }

  const handleSubmit = () => {
    // incrementStep()
    router.push(
      "/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_make_model_year",
    )
  }

  const isFormComplete = React.useMemo(() => {
    return licensePlate
  }, [licensePlate])

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText fontBold className="text-xl">
              Your car
            </FancyText>
          ),
        }}
      />
      {/* <Stack.Screen options={{ title: "Your car" }} /> */}
      <StackView
        direction="horizontal"
        className="fixed justify-between px-6 py-4 top-0 left-0"
      >
        <FancyText fontBold>1 of 12</FancyText>
        <NiceButton
          variant="text"
          size="small"
          className="bg-zinc-200 !py-2 px-5"
          onPress={() =>
            router.push(
              "/(protected)/vehicle-listing-screens/listing-steps-involved",
            )
          }
        >
          View steps
        </NiceButton>
      </StackView>
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <View className="flex-1 px-6 pt-4 gap-y-4">
          <FancyText className="text-3xl font-bold">
            License plate
          </FancyText>
          <Text>
            Your license plate information won't be publicly visible.
          </Text>
          <Pressable onPress={handleInputFocus}>
            <StackView
              direction="horizontal"
              className="justify-between border-t border-b border-zinc-300 py-4"
            >
              <FancyText className="text-lg">License plate</FancyText>
              <TextInput
                ref={inputRef}
                placeholder="Plate number"
                className="rounded-md p-2 text-right"
                autoCapitalize="characters"
                value={licensePlate}
                onChangeText={handleTextChange}
              />
            </StackView>
          </Pressable>
        </View>
        <FixedBottomView className="h-[97px]">
          <NiceButton
            onPress={handleSubmit}
            disabled={!isFormComplete}
          >
            Submit
          </NiceButton>
        </FixedBottomView>
      </Pressable>
    </>
  )
}
