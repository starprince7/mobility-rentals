import React from "react"
import { Stack, useRouter } from "expo-router"
import { View, Text, ScrollView, Pressable, Keyboard, Switch } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { FancyText, FixedBottomView, NiceButton, StackView } from "@/components/ui"
import {
  selectSafetyStandards,
  submitSafetyStandards,
} from "@/store/accept-safety-standard/reducer"
import {
  setAgreesToMaintenanceRequirements,
  setAgreesToSafetyInspection,
  setAgreesToCleanlinessStandards,
  setAgreesToInsuranceRequirements,
  setAgreesToDrivingRecordCheck,
} from "@/store/accept-safety-standard/reducer"

export default function SafetyQualityStandardsScreen() {
  const router = useRouter()
  const dispatch = useDispatch()

  // You would normally get this from Redux, but we're using local state for now
  const safetyStandards = useSelector(selectSafetyStandards)
  const {
    agreesToMaintenanceRequirements,
    agreesToSafetyInspection,
    agreesToCleanlinessStandards,
    agreesToInsuranceRequirements,
    agreesToDrivingRecordCheck,
  } = safetyStandards

  const handleToggleSwitch = (key: keyof typeof safetyStandards) => {
    switch (key) {
      case "agreesToMaintenanceRequirements":
        dispatch(
          setAgreesToMaintenanceRequirements(!safetyStandards.agreesToMaintenanceRequirements),
        )
        break
      case "agreesToSafetyInspection":
        dispatch(setAgreesToSafetyInspection(!safetyStandards.agreesToSafetyInspection))
        break
      case "agreesToCleanlinessStandards":
        dispatch(setAgreesToCleanlinessStandards(!safetyStandards.agreesToCleanlinessStandards))
        break
      case "agreesToInsuranceRequirements":
        dispatch(setAgreesToInsuranceRequirements(!safetyStandards.agreesToInsuranceRequirements))
        break
      case "agreesToDrivingRecordCheck":
        dispatch(setAgreesToDrivingRecordCheck(!safetyStandards.agreesToDrivingRecordCheck))
        break
    }
  }

  const handleSubmit = () => {
    // Save to Redux (commented out for now)
    dispatch<any>(submitSafetyStandards(safetyStandards))

    // Navigate to next screen
    router.push("/(protected)/vehicle-listing-screens/collect-payout-information")
  }

  const isFormComplete =
    safetyStandards.agreesToCleanlinessStandards &&
    safetyStandards.agreesToDrivingRecordCheck &&
    safetyStandards.agreesToInsuranceRequirements &&
    safetyStandards.agreesToMaintenanceRequirements &&
    safetyStandards.agreesToSafetyInspection

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText fontBold className="text-xl">
              Safety & Quality Standards
            </FancyText>
          ),
        }}
      />
      <StackView direction="horizontal" className="fixed justify-between px-6 py-4 top-0 left-0">
        <FancyText fontBold>10 of 11</FancyText>
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
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 px-6 pt-4 mb-12">
          <FancyText className="text-3xl font-bold mb-2">Safety & Quality Standards</FancyText>
          <Text className="text-zinc-600 mb-6">
            To ensure a safe and enjoyable experience for all users, we require all vehicles to
            meet our safety and quality standards.
          </Text>

          <View className="bg-zinc-50 p-4 rounded-3xl mb-6">
            <FancyText className="text-lg font-bold mb-2">Our commitment to safety</FancyText>
            <Text className="text-zinc-600 mb-2">
              At our marketplace, safety is our top priority. We enforce strict standards to
              ensure all vehicles are road-worthy and guests have a positive experience.
            </Text>
          </View>

          {/* Safety Standard Items */}
          <StandardRequirementItem
            title="Regular Maintenance"
            description="I agree to maintain my vehicle according to manufacturer recommendations and keep records of services."
            isChecked={safetyStandards.agreesToMaintenanceRequirements}
            onToggle={() => handleToggleSwitch("agreesToMaintenanceRequirements")}
          />

          <StandardRequirementItem
            title="Safety Inspection"
            description="I agree that my vehicle meets all Nigerian safety regulations and will pass periodic safety inspections."
            isChecked={safetyStandards.agreesToSafetyInspection}
            onToggle={() => handleToggleSwitch("agreesToSafetyInspection")}
          />

          <StandardRequirementItem
            title="Cleanliness Standards"
            description="I agree to ensure my vehicle is clean inside and out before each guest booking."
            isChecked={safetyStandards.agreesToCleanlinessStandards}
            onToggle={() => handleToggleSwitch("agreesToCleanlinessStandards")}
          />

          <StandardRequirementItem
            title="Insurance Requirements"
            description="I confirm that my vehicle has valid insurance coverage that meets all Nigerian legal requirements."
            isChecked={safetyStandards.agreesToInsuranceRequirements}
            onToggle={() => handleToggleSwitch("agreesToInsuranceRequirements")}
          />

          <StandardRequirementItem
            title="Driving Record Check"
            description="I consent to a verification of my driving record to ensure safe driving history."
            isChecked={safetyStandards.agreesToDrivingRecordCheck}
            onToggle={() => handleToggleSwitch("agreesToDrivingRecordCheck")}
          />

          <View className="h-20" />
        </ScrollView>
        <FixedBottomView className="h-[97px]">
          <NiceButton onPress={handleSubmit} disabled={!isFormComplete}>
            I Agree to All Standards
          </NiceButton>
        </FixedBottomView>
      </Pressable>
    </>
  )
}

// Component for each safety standard item
interface StandardRequirementItemProps {
  title: string
  description: string
  isChecked: boolean
  onToggle: () => void
}

const StandardRequirementItem = ({
  title,
  description,
  isChecked,
  onToggle,
}: StandardRequirementItemProps) => {
  return (
    <Pressable onPress={onToggle} className="mb-4">
      <View className="flex-row justify-between items-start border border-zinc-200 rounded-3xl px-4 py-6">
        <View className="flex-1 mr-4">
          <FancyText className="font-bold mb-1">{title}</FancyText>
          <Text className="text-zinc-600">{description}</Text>
        </View>
        <Switch
          value={isChecked}
          onValueChange={onToggle}
          trackColor={{ false: "#e4e4e7", true: "#4ade80" }}
          thumbColor={isChecked ? "#fff" : "#fff"}
        />
      </View>
    </Pressable>
  )
}
