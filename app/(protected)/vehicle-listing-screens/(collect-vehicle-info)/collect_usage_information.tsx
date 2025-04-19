import {
  View,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from "react-native"
import React, { useState } from "react"

import {
  FancyList as FancyBottomList,
  FancyText,
  FixedBottomView,
  NiceButton,
  StackView,
} from "@/components/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  createVehicleListing,
  selectVehicleOnboardingStore,
  setFuelType,
  setMileage,
  setTransmission,
} from "@/store/vehicle-onboarding-data/reducer"
import { ChevronDownIcon } from "react-native-heroicons/solid"
import { router, Stack } from "expo-router"

type FieldId = "mileage" | "transmission" | "fuelType"

export default function CollectUsageInformation() {
  const dispatch = useDispatch()
  const vehicleOnboardingData = useSelector(
    selectVehicleOnboardingStore,
  )
  const { mileage, transmission, fuelType, requestStatus } =
    vehicleOnboardingData

  const [activeField, setActiveField] = useState<FieldId | null>(null)

  const inputFields = [
    {
      id: "mileage" as FieldId,
      label: "Odometer Reading",
      placeholder: "select",
      value: mileage || "",
      isLoading: false,
    },
    {
      id: "transmission" as FieldId,
      label: "Transmission",
      placeholder: "select",
      value: transmission || "",
      isLoading: false,
    },
    {
      id: "fuelType" as FieldId,
      label: "Fuel Type",
      placeholder: "select",
      value: fuelType || "",
      isLoading: false,
    },
  ]

  // Check if all fields are filled
  const isFormComplete = React.useMemo(() => {
    return mileage && (transmission || transmission?.trim())
  }, [mileage, transmission])

  // Send the vehicle onboarding data to API
  const handleSubmit = () => {
    // incrementStep()
    dispatch(createVehicleListing(vehicleOnboardingData) as any)
  }

  const handleSelectMileage = (selectedTrim: string) => {
    dispatch(setMileage(selectedTrim))
    setActiveField(null)
  }

  const handleSelectTransmission = (selected: any) => {
    dispatch(setTransmission(selected))
    setActiveField(null)
  }

  const handleSelectFueltype = (selected: any) => {
    dispatch(setFuelType(selected))
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
            Usage information
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
                      {field.value && (
                        <FancyText>{field.value}</FancyText>
                      )}
                      {!field.value && (
                        <FancyText className="text-zinc-400">
                          {field.placeholder}
                        </FancyText>
                      )}
                    </FancyText>
                  )}
                  {field.isLoading && (
                    <ActivityIndicator size="small" />
                  )}
                </StackView>
              </Pressable>
            ))}
          </StackView>

          {activeField === "mileage" && (
            <FancyBottomList
              title="Select mileage"
              items={[
                "10-20k kilometers",
                "20-30k kilometers",
                "30-40k kilometers",
                "40-50k kilometers",
                "50-60k kilometers",
                "60-70k kilometers",
                "70-80k kilometers",
                "80-90k kilometers",
                "90-100k kilometers",
                "100-110k kilometers",
                "110-120k kilometers",
                "120-130k kilometers",
              ]}
              onSelectItem={handleSelectMileage}
              initialSnapPoint={1}
            />
          )}

          {activeField === "transmission" && (
            <FancyBottomList
              title="Select transmission"
              items={["automatic", "manual"]}
              onSelectItem={handleSelectTransmission}
              initialSnapPoint={1}
            />
          )}
          {activeField === "fuelType" && (
            <FancyBottomList
              title="Select fuel type"
              items={["petrol", "diesel", "electric", "hybrid"]}
              onSelectItem={handleSelectFueltype}
              initialSnapPoint={1}
            />
          )}
        </View>
        <FixedBottomView className="h-[97px]">
          <NiceButton
            onPress={handleSubmit}
            disabled={!isFormComplete || requestStatus === "loading"}
            loading={requestStatus === "loading"}
          >
            Submit
          </NiceButton>
        </FixedBottomView>
      </Pressable>
    </>
  )
}
