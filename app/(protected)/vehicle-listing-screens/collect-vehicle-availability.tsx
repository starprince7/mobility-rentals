import React, { useState, useEffect } from "react"
import { Stack, useRouter } from "expo-router"
import { View, Text, ScrollView, Pressable, Alert, Switch, Platform, Modal } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Calendar, DateData } from "react-native-calendars"
import { format, addDays, parseISO, isBefore, isEqual } from "date-fns"

import { FancyText, FixedBottomView, NiceButton, StackView } from "@/components/ui"
import {
  setVehicleAvailability,
  setAutoApproveBookings,
  selectVehicleOnboardingStore,
} from "@/store/vehicle-onboarding-data/reducer"

// Define types
interface DateRange {
  startDate: string // ISO string
  endDate: string // ISO string
}

interface MarkedDates {
  [date: string]: {
    selected?: boolean
    marked?: boolean
    startingDay?: boolean
    endingDay?: boolean
    color?: string
    textColor?: string
    dotColor?: string
  }
}

// Recurring availability options
const recurringOptions = [
  { id: "weekends", label: "Weekends" },
  { id: "weekdays", label: "Weekdays" },
  { id: "full-time", label: "Full-time" },
]

export default function VehicleAvailabilityScreen(): React.ReactElement {
  const router = useRouter()
  const dispatch = useDispatch()
  const { vehicleAvailabilty, autoApproveBookings } = useSelector(selectVehicleOnboardingStore)

  // State for calendar interaction (temporary state during user selection)
  const [markedDates, setMarkedDates] = useState<MarkedDates>({})
  const [isSelecting, setIsSelecting] = useState<boolean>(false)
  const [selectionStart, setSelectionStart] = useState<string | null>(null)
  const [selectedRecurring, setSelectedRecurring] = useState<string | null>(null)
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false)

  // Theme colors using the #4f46e5 (indigo) color and its shades
  const themeColors = {
    primary: "#4f46e5", // Main indigo color
    primaryLight: "#818cf8", // Lighter shade
    primaryLighter: "#c7d2fe", // Even lighter shade
    primaryDark: "#4338ca", // Darker shade
  }

  // Format calendar marked dates whenever vehicle availability changes
  useEffect(() => {
    const formattedMarkedDates: MarkedDates = {}

    if (vehicleAvailabilty && Array.isArray(vehicleAvailabilty)) {
      vehicleAvailabilty.forEach((range) => {
        let currentDate = parseISO(range.startDate)
        const endDate = parseISO(range.endDate)

        while (!isBefore(endDate, currentDate)) {
          const dateString = format(currentDate, "yyyy-MM-dd")
          const isStartDate = dateString === range.startDate
          const isEndDate = dateString === range.endDate

          formattedMarkedDates[dateString] = {
            selected: true,
            marked: true,
            startingDay: isStartDate,
            endingDay: isEndDate,
            color: themeColors.primary,
            textColor: "white",
            dotColor: "white", // Make dot visible
          }

          currentDate = addDays(currentDate, 1)
        }
      })
    }

    setMarkedDates(formattedMarkedDates)
  }, [vehicleAvailabilty])

  // Handle date selection
  const handleDayPress = (day: DateData) => {
    if (!isSelecting) {
      // Start new selection
      setIsSelecting(true)
      setSelectionStart(day.dateString)
    } else {
      // Complete selection
      setIsSelecting(false)

      if (selectionStart) {
        // Ensure dates are in correct order
        const start = selectionStart < day.dateString ? selectionStart : day.dateString
        const end = selectionStart < day.dateString ? day.dateString : selectionStart

        // Add new date range
        const newDateRange: DateRange = {
          startDate: start,
          endDate: end,
        }

        // Update Redux store with the new date range
        const updatedAvailability = [...(vehicleAvailabilty || []), newDateRange]
        dispatch(setVehicleAvailability(updatedAvailability as any))
      }

      setSelectionStart(null)
    }
  }

  // Handle recurring selection
  const handleRecurringSelection = (optionId: string) => {
    // Toggle selection
    if (selectedRecurring === optionId) {
      setSelectedRecurring(null)
      return
    }

    setSelectedRecurring(optionId)

    // Generate date ranges based on selection
    const today = new Date()
    const nextThreeMonths = addDays(today, 90)
    let newRanges: DateRange[] = []

    // Keep existing manual selections if we want to merge them
    // Uncomment this line if you want to keep existing selections
    // newRanges = [...(vehicleAvailabilty || [])];

    if (optionId === "weekends") {
      // Generate weekend dates (Saturday and Sunday) for next 3 months
      let currentDate = new Date(today)

      // Find the first Saturday from today or after today
      while (currentDate.getDay() !== 6) {
        // 6 is Saturday
        currentDate = addDays(currentDate, 1)
      }

      // Loop through all weekends until we reach 3 months out
      while (isBefore(currentDate, nextThreeMonths) || isEqual(currentDate, nextThreeMonths)) {
        // Add Saturday
        const saturdayStart = format(currentDate, "yyyy-MM-dd")

        // Add Sunday
        const sunday = addDays(currentDate, 1)
        const sundayEnd = format(sunday, "yyyy-MM-dd")

        // Only add the weekend if Sunday is still within our 3-month range
        if (isBefore(sunday, nextThreeMonths) || isEqual(sunday, nextThreeMonths)) {
          newRanges.push({
            startDate: saturdayStart,
            endDate: sundayEnd,
          })
        }

        // Move to next weekend (add 7 days to get from Saturday to Saturday)
        currentDate = addDays(currentDate, 7)
      }

      dispatch(setVehicleAvailability(newRanges))
    } else if (optionId === "weekdays") {
      // Generate weekday ranges (Monday-Friday) for next 3 months
      let currentDate = new Date(today)

      // Find the next Monday if today is not a weekday or is weekend
      const dayOfWeek = currentDate.getDay() // 0 is Sunday, 6 is Saturday
      if (dayOfWeek === 0) {
        // Sunday
        currentDate = addDays(currentDate, 1) // Move to Monday
      } else if (dayOfWeek === 6) {
        // Saturday
        currentDate = addDays(currentDate, 2) // Move to Monday
      }

      // Loop through all weeks until we reach 3 months out
      while (isBefore(currentDate, nextThreeMonths)) {
        const dayOfWeek = currentDate.getDay()

        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          // Weekday (Monday-Friday)
          // Find the end of the current weekday streak
          let weekdayStart = format(currentDate, "yyyy-MM-dd")
          let endOfWeek = new Date(currentDate)

          // If we're not starting on Monday, go until Friday of this week
          while (endOfWeek.getDay() !== 5 && isBefore(endOfWeek, nextThreeMonths)) {
            endOfWeek = addDays(endOfWeek, 1)
          }

          const weekdayEnd = format(endOfWeek, "yyyy-MM-dd")

          // Add weekday range
          newRanges.push({
            startDate: weekdayStart,
            endDate: weekdayEnd,
          })

          // Move to next Monday
          currentDate = addDays(endOfWeek, 3)
        } else {
          // This shouldn't happen based on our logic, but just in case
          currentDate = addDays(currentDate, 1)
        }
      }

      dispatch(setVehicleAvailability(newRanges))
    } else if (optionId === "full-time") {
      // Full time availability for next 3 months
      newRanges.push({
        startDate: format(today, "yyyy-MM-dd"),
        endDate: format(nextThreeMonths, "yyyy-MM-dd"),
      })

      dispatch(setVehicleAvailability(newRanges))
    }
  }

  // Handle auto-approve toggle
  const handleAutoApproveToggle = (newValue: boolean) => {
    dispatch(setAutoApproveBookings(newValue))
  }

  // Clear all selected dates
  const clearSelection = () => {
    dispatch(setVehicleAvailability([]))
    setSelectedRecurring(null)
  }

  // Handle submit
  const handleSubmit = () => {
    if (!vehicleAvailabilty || vehicleAvailabilty.length === 0) {
      Alert.alert(
        "No availability set",
        "Please select at least one date range when your vehicle is available",
      )
      return
    }

    // Navigate to next screen
    router.push(
      "/(protected)/vehicle-listing-screens/collect-physical-car-details",
    )
  }

  // Info modal for auto-approve bookings
  const renderInfoModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setInfoModalVisible(false)}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              maxHeight: "70%",
            }}
          >
            <FancyText fontBold className="text-xl mb-4">
              Auto-approve Bookings
            </FancyText>

            <ScrollView>
              <Text className="text-gray-700 text-base leading-6 mb-3">
                When you enable auto-approve:
              </Text>

              <View className="ml-4 mb-4">
                <Text className="text-gray-700 mb-2">
                  • Guests get immediate confirmation of their booking
                </Text>
                <Text className="text-gray-700 mb-2">
                  • You don't need to manually review and approve each request
                </Text>
                <Text className="text-gray-700 mb-2">
                  • The booking process becomes faster and more efficient
                </Text>
              </View>

              <Text className="text-gray-700 text-base leading-6 mb-3">
                This feature is particularly useful when you're certain about your availability
                and want to minimize the time spent managing your listing.
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-3">
                If you prefer to review each booking request individually (perhaps to screen
                potential renters or check your schedule again), you should keep this toggle
                turned off.
              </Text>
            </ScrollView>

            <NiceButton onPress={() => setInfoModalVisible(false)} className="mt-5">
              Got it
            </NiceButton>
          </View>
        </Pressable>
      </Modal>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText fontBold className="text-xl">
              Vehicle Availability
            </FancyText>
          ),
        }}
      />
      <StackView direction="horizontal" className="fixed justify-between px-6 py-4 top-0 left-0">
        <FancyText fontBold>3 of 12</FancyText>
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

      {renderInfoModal()}

      <ScrollView className="flex-1 px-6 pt-4">
        <View className="gap-y-4 pb-24 mb-14">
          <FancyText className="text-3xl font-bold">Set your vehicle's availability</FancyText>
          <Text className="text-gray-600 mb-2">
            Select the dates when your car will be available for guests to book.
          </Text>

          {/* Calendar component */}
          <View className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Calendar
              markingType="period"
              markedDates={markedDates}
              onDayPress={handleDayPress}
              minDate={format(new Date(), "yyyy-MM-dd")}
              theme={{
                todayTextColor: themeColors.primary,
                arrowColor: themeColors.primary,
                dotColor: themeColors.primaryLight,
                selectedDayBackgroundColor: themeColors.primary,
                selectedDayTextColor: "#ffffff",
                textMonthFontWeight: "bold",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>

          {/* Selection help text */}
          <View className="mt-2">
            {isSelecting ? (
              <Text className="text-indigo-600 italic">
                Now select an end date for your availability period
              </Text>
            ) : (
              <Text className="text-gray-500 italic">
                Tap a date to start selecting an availability period
              </Text>
            )}
          </View>

          {/* Quick selection options */}
          <View className="mt-4">
            <FancyText fontBold className="mb-2 text-lg">
              Quick availability options
            </FancyText>
            <View className="gap-y-2">
              {recurringOptions.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() => handleRecurringSelection(option.id)}
                  className={`p-4 rounded-lg border ${
                    selectedRecurring === option.id
                      ? `border-${themeColors.primary} bg-indigo-50`
                      : "border-gray-300"
                  }`}
                >
                  <StackView direction="horizontal" className="items-center justify-between">
                    <FancyText>{option.label}</FancyText>
                    {selectedRecurring === option.id && (
                      <View className="h-6 w-6 rounded-full bg-indigo-500 items-center justify-center">
                        <Text className="text-white font-bold">✓</Text>
                      </View>
                    )}
                  </StackView>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Auto-approve toggle with info icon */}
          <View className="mt-6 bg-gray-50 p-4 rounded-lg">
            <StackView direction="horizontal" className="items-center justify-between gap-2.5">
              <View className="flex-1 flex-row items-center">
                <View className="flex-1">
                  <FancyText fontBold className="text-lg">
                    Auto-approve bookings
                  </FancyText>
                  <Text className="text-gray-600 mt-1">
                    Automatically approve booking requests during available periods
                  </Text>
                </View>
                <Pressable
                  onPress={() => setInfoModalVisible(true)}
                  className="h-6 w-6 rounded-full bg-gray-200 items-center justify-center ml-2"
                >
                  <Text className="text-indigo-700 font-bold">?</Text>
                </Pressable>
              </View>
              <Switch
                value={autoApproveBookings}
                onValueChange={handleAutoApproveToggle}
                trackColor={{
                  false: "#d1d5db",
                  true: themeColors.primary,
                }}
                thumbColor={
                  Platform.OS === "ios" ? "#ffffff" : autoApproveBookings ? "#ffffff" : "#f3f4f6"
                }
              />
            </StackView>
          </View>

          {/* Clear button */}
          {vehicleAvailabilty && vehicleAvailabilty.length > 0 && (
            <Pressable onPress={clearSelection} className="mt-4 py-2 items-center">
              <Text className="text-red-600 font-semibold">Clear all availability</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      <FixedBottomView className="h-[97px]">
        <NiceButton
          onPress={handleSubmit}
          disabled={!vehicleAvailabilty || vehicleAvailabilty.length === 0}
        >
          Continue
        </NiceButton>
      </FixedBottomView>
    </>
  )
}
