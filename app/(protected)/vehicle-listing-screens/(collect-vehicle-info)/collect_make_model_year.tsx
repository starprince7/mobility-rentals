import { View, TextInput, Pressable, Keyboard, ActivityIndicator } from "react-native"
import { Stack, useRouter } from "expo-router"
import React, { useState } from "react"
import { FancyList, FancyText, FixedBottomView, NiceButton, StackView } from "@/components/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  selectVehicleOnboardingStore,
  setYear,
  setMake,
  setModel,
} from "@/store/vehicle-onboarding-data/reducer"
import { useVehicleMake, useVehicleModel, useVehicleYears } from "@/hooks"
import { ChevronDownIcon } from "react-native-heroicons/solid"

type FieldId = "year" | "make" | "model"

export default function CollectMakeModelYear() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { year, make, model } = useSelector(selectVehicleOnboardingStore)

  // const { data: years, isLoading: isLoadingVehicleYear } = useVehicleYears()
  // const { data: vehicleMake, isLoading: isLoadingVehicleMake } = useVehicleMake(year)
  // const { data: vehicleModel, isLoading: isLoadingVehicleModels } = useVehicleModel(make)

  const [activeField, setActiveField] = useState<FieldId | null>(null)

  const inputRefs: Record<FieldId, React.RefObject<TextInput>> = {
    year: React.useRef<TextInput>(null),
    make: React.useRef<TextInput>(null),
    model: React.useRef<TextInput>(null),
  }

  const inputFields = [
    {
      id: "year" as FieldId,
      label: "Vehicle Year",
      placeholder: "YYYY",
      value: year || "",
      ref: inputRefs.year,
      onChangeText: (text: string) => dispatch(setYear(text)),
      onFocus: () => setActiveField("year"),
      isLoading: false,
    },
    {
      id: "make" as FieldId,
      label: "Vehicle Make",
      placeholder: "Make",
      value: make || "",
      ref: inputRefs.make,
      onChangeText: (text: string) => dispatch(setMake(text)),
      onFocus: () => setActiveField("make"),
      isLoading: false,
    },
    {
      id: "model" as FieldId,
      label: "Vehicle Model",
      placeholder: "Model",
      value: model || "",
      ref: inputRefs.model,
      onChangeText: (text: string) => dispatch(setModel(text)),
      onFocus: () => setActiveField("model"),
      isLoading: false,
    },
  ]

  // Check if all fields are filled
  const isFormComplete = React.useMemo(() => {
    return (year || year?.trim()) && (make || make?.trim()) && (model || model?.trim())
  }, [year, make, model])

  const handleInputFocus = (fieldId: FieldId) => {
    inputRefs[fieldId]?.current?.focus()
    setActiveField(fieldId)
  }

  const handleSubmit = () => {
    // incrementStep()
    // router.push(
    //   "/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_trim_and_style",
    // )

    /*
     * Note: Since the car API access hasn't been paid for yet.
     * the handle submit function will redirect to the next practical step
     */
    router.push(
      "/(protected)/vehicle-listing-screens/(collect-personal-info)/collect_profile_information",
    )
  }

  const handleSelectYear = (selectedYear: string) => {
    dispatch(setYear(selectedYear))
    setActiveField(null)
    inputRefs.make?.current?.focus()
  }

  const handleSelectMake = (selectedMake: string) => {
    dispatch(setMake(selectedMake))
    setActiveField(null)
    inputRefs.model?.current?.focus()
  }

  const handleSelectModel = (selectedModel: string) => {
    dispatch(setModel(selectedModel))
    setActiveField(null)
    Keyboard.dismiss()
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => <FancyText className="text-xl">List your car</FancyText>,
        }}
      />
      {/* <Stack.Screen options={{ title: "Your car" }} /> */}
      <StackView direction="horizontal" className="fixed justify-between px-6 py-4 top-0 left-0">
        <FancyText fontBold>1 of 12</FancyText>
        <NiceButton
          variant="text"
          size="small"
          className="bg-zinc-200 !py-2 px-5"
          onPress={() =>
            router.push("/(protected)/vehicle-listing-screens/listing-steps-involved")
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
        <View className="flex-1 px-6 pt-2 gap-y-4">
          <FancyText className="text-3xl font-bold">Manufacturer information</FancyText>
          <FancyText className="text-zinc-700">
            Your vehicle manufacturer information won't be publicly visible.
          </FancyText>
          <StackView direction="vertical" className="gap-y-4">
            {inputFields.map((field) => (
              <Pressable
                key={field.id}
                onPress={() => {
                  // setActiveField(field.id)
                }}
              >
                <StackView
                  direction="horizontal"
                  className="justify-between border-t border-zinc-300 pt-6"
                >
                  <FancyText fontBold className="text-lg text-zinc-700">
                    {field.label}
                  </FancyText>
                  {!field.isLoading && (
                    <View className="flex-row items-center">
                      <TextInput
                        ref={field.ref}
                        value={field.value}
                        placeholder={field.placeholder}
                        onChangeText={field.onChangeText}
                        onFocus={field.onFocus}
                        onBlur={() => setActiveField(null)}
                        style={{
                          fontSize: 16,
                          textAlign: "right",
                          textTransform: "uppercase",
                          color: "#27272a", // zinc-800
                          minWidth: 80,
                          paddingVertical: 4,
                        }}
                        placeholderTextColor="#a1a1aa" // zinc-400
                        autoCapitalize="characters"
                        autoCorrect={false}
                        returnKeyType={field.id === "model" ? "done" : "next"}
                        onSubmitEditing={() => {
                          if (field.id === "year") {
                            inputRefs.make?.current?.focus()
                          } else if (field.id === "make") {
                            inputRefs.model?.current?.focus()
                          } else {
                            Keyboard.dismiss()
                            setActiveField(null)
                          }
                        }}
                      />
                      {/* <ChevronDownIcon size={17} color="gray" style={{ marginLeft: 4 }} /> */}
                    </View>
                  )}
                  {field.isLoading && <ActivityIndicator size="small" />}
                </StackView>
              </Pressable>
            ))}
          </StackView>

          {/* =================== Render a bottom FancyList when any inputFields are focused ================ */}
          {/* {activeField === "year" && years && years.length > 0 && (
            <FancyList
              title="Select Year"
              items={years}
              onSelectItem={handleSelectYear}
              initialSnapPoint={1}
            />
          )}

          {activeField === "make" && vehicleMake?.data && vehicleMake.data.length > 0 && (
            <FancyList
              title="Select Make"
              items={vehicleMake.data.map((make) => make.name)}
              onSelectItem={handleSelectMake}
              initialSnapPoint={1}
            />
          )}

          {activeField === "model" && vehicleModel?.data && vehicleModel.data.length > 0 && (
            <FancyList
              title="Select Model"
              items={vehicleModel.data.map((model) => model.name)}
              onSelectItem={handleSelectModel}
              initialSnapPoint={1}
            />
          )} */}
        </View>
        <FixedBottomView className="h-[97px]">
          <NiceButton onPress={handleSubmit} disabled={!isFormComplete}>
            Submit
          </NiceButton>
        </FixedBottomView>
      </Pressable>
    </>
  )
}
