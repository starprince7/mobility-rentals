import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

import {
  FancyText,
  FixedBottomView,
  NiceButton,
  StackView,
} from "@/components/ui"
import {
  selectHost,
  setGoalOptions,
  setSelectedGoals,
} from "@/store/host/reducer"

export default function CollectHostGoalsScreen(): React.ReactElement {
  const router = useRouter()
  const dispatch = useDispatch()
  const { selectedGoals, goalOptions } = useSelector(selectHost)

  // Define custom goal state
  const [customGoal, setCustomGoal] = useState<string>("")

  // Toggle goal selection
  const toggleGoal = (goalId: string): void => {
    if (selectedGoals.includes(goalId)) {
      dispatch(
        setSelectedGoals(selectedGoals.filter((id) => id !== goalId)),
      )
    } else {
      dispatch(setSelectedGoals([...selectedGoals, goalId]))
    }
  }

  // Add custom goal
  const addCustomGoal = (): void => {
    if (customGoal.trim()) {
      const newGoalId = `custom-${Date.now()}`
      dispatch(setSelectedGoals([...selectedGoals, newGoalId]))
      dispatch(
        setGoalOptions([
          ...goalOptions,
          { id: newGoalId, label: customGoal.trim() },
        ]),
      )
      setCustomGoal("")
    }
  }

  const handleSubmit = (): void => {
    // Goals are already saved to store.
    router.push(
      "/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_make_model_year",
    )
  }

  const isFormComplete: boolean = selectedGoals.length > 0

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText fontBold className="text-xl">
              Your goals
            </FancyText>
          ),
        }}
      />
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
      <Pressable className="flex-1 pb-10" onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 px-6 pt-4">
          <View className="gap-y-4 pb-24">
            <FancyText className="text-3xl font-bold">
              Your goals
            </FancyText>
            <Text className="text-gray-600 mb-4">
              Why are you sharing your vehicle? Select all that apply.
            </Text>

            {/* Goal selection cards */}
            <View className="gap-y-3">
              {goalOptions.map((goal) => (
                <Pressable
                  key={goal.id}
                  onPress={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-lg border ${
                    selectedGoals.includes(goal.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <StackView
                    direction="horizontal"
                    className="items-center justify-between"
                  >
                    <FancyText className="text-lg">
                      {goal.label}
                    </FancyText>
                    {selectedGoals.includes(goal.id) && (
                      <View className="h-6 w-6 rounded-full bg-blue-500 items-center justify-center">
                        <Text className="text-white font-bold">
                          ✓
                        </Text>
                      </View>
                    )}
                  </StackView>
                </Pressable>
              ))}
            </View>

            {/* Custom goal input */}
            <View className="mt-6">
              <FancyText className="mb-2 font-semibold">
                Other goal (optional)
              </FancyText>
              <View className="flex-row items-center gap-x-2">
                <TextInput
                  placeholder="Set your own goal"
                  value={customGoal}
                  onChangeText={setCustomGoal}
                  className="flex-1 border border-gray-300 rounded-lg p-3"
                />
                <NiceButton
                  size="small"
                  onPress={addCustomGoal}
                  disabled={!customGoal.trim()}
                >
                  Add
                </NiceButton>
              </View>
            </View>

            {/* Earnings estimate (optional enhancement) */}
            <View className="mt-8 bg-green-50 p-4 rounded-lg border border-green-200">
              <FancyText fontBold className="text-lg mb-2">
                Potential earnings
              </FancyText>
              <Text className="text-gray-700">
                Hosts in your area earn an average of $500-$800 per
                month sharing their vehicle.
              </Text>
            </View>
          </View>
        </ScrollView>
        <FixedBottomView className="h-[97px]">
          <NiceButton
            onPress={handleSubmit}
            disabled={!isFormComplete}
          >
            Continue
          </NiceButton>
        </FixedBottomView>
      </Pressable>
    </>
  )
}
