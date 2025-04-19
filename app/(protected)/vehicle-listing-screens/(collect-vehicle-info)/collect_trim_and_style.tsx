import {
  View,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"

import {
  FancyList as FancyBottomList,
  FancyText,
  FixedBottomView,
  NiceButton,
  StackView,
} from "@/components/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  selectVehicleOnboardingStore,
  setTrim,
  setStyle,
} from "@/store/vehicle-onboarding-data/reducer"
import { useVehicleTrim } from "@/hooks"
import { ChevronDownIcon } from "react-native-heroicons/solid"

type FieldId = "trim" | "style"

export default function CollectTrimAndStyle() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { trim, make, model, style } = useSelector(
    selectVehicleOnboardingStore,
  )

  const { data: vehicleTrims, isLoading: isLoadingVehicleTrim } =
    useVehicleTrim(make!, model!)

  const [activeField, setActiveField] = useState<FieldId | null>(null)

  const inputFields = [
    {
      id: "trim" as FieldId,
      label: "Vehicle Trim",
      placeholder: "Select trim",
      value: trim || "",
      isLoading: isLoadingVehicleTrim,
    },
    {
      id: "style" as FieldId,
      label: "Vehicle Style",
      placeholder: "Select style",
      value: style || "",
      isLoading: false,
    },
  ]

  // Check if all fields are filled
  const isFormComplete = React.useMemo(() => {
    return (trim || trim?.trim()) && (style || style?.trim())
  }, [trim, style])

  const handleSubmit = () => {
    // incrementStep()
    router.push(
      "/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_usage_information",
    )
  }

  const handleSelectTrim = (selectedTrim: string) => {
    dispatch(setTrim(selectedTrim))
    setActiveField(null)
  }

  const handleSelectStyle = (selectedStyle: string) => {
    dispatch(setStyle(selectedStyle))
    setActiveField(null)
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText className="text-xl">List your car</FancyText>
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
      <Pressable
        className="flex-1"
        onPress={() => {
          Keyboard.dismiss()
          setActiveField(null)
        }}
      >
        <View className="flex-1 px-6 pt-6 gap-y-4">
          <FancyText className="text-3xl font-bold">
            Trim and Style
          </FancyText>
          <StackView direction="vertical" className="gap-y-4">
            {inputFields.map((field) => (
              <Pressable
                key={field.id}
                onPress={() => {
                  setActiveField(field.id)
                }}
              >
                <StackView
                  direction="horizontal"
                  className="justify-between border-t border-zinc-300 pt-6"
                >
                  <FancyText
                    fontBold
                    className="text-lg text-zinc-700"
                  >
                    {field.label}
                  </FancyText>
                  {!field.isLoading && (
                    <FancyText
                      className="text-base uppercase text-right"
                      endIcon={
                        <ChevronDownIcon size={17} color="gray" />
                      }
                    >
                      {field.value || field.placeholder}
                    </FancyText>
                  )}
                  {field.isLoading && (
                    <ActivityIndicator size="small" />
                  )}
                </StackView>
              </Pressable>
            ))}
          </StackView>

          {activeField === "trim" &&
            vehicleTrims?.data &&
            vehicleTrims.data.length > 0 && (
              <FancyBottomList
                title="Select Trim"
                items={
                  vehicleTrims?.data.map((trim) => trim.name) || []
                }
                onSelectItem={handleSelectTrim}
                initialSnapPoint={1}
              />
            )}

          {activeField === "style" && (
            <FancyBottomList
              title="Select Style"
              items={["E (360bhp) AWD Long Range SUV 5d Auto"]}
              onSelectItem={handleSelectStyle}
              initialSnapPoint={1}
            />
          )}
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
