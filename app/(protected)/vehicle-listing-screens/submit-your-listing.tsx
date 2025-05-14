import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { FancyText, FixedBottomView, NiceButton, StackView } from "@/components/ui"
// import { selectHost, submitVehicleListing } from "@/store/host/reducer"

export default function SubmitListingScreen() {
  const router = useRouter()
  const dispatch = useDispatch()

  // In a real implementation, you would get this data from your Redux store
  // const hostData = useSelector(selectHost)

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data - replace with actual data from Redux store when implementing
  const vehicleInfo = {
    make: "Toyota",
    model: "Camry",
    year: "2019",
    licensePlate: "ABC123NG",
    location: "Lagos, Nigeria",
    images: 5, // Number of images uploaded
    pricing: "₦15,000 per day",
  }

  const handleSubmitListing = async () => {
    try {
      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real implementation:
      // await dispatch(submitVehicleListing()).unwrap()

      setIsSubmitting(false)

      // Show success message
      Alert.alert(
        "Listing Submitted Successfully!",
        "Your vehicle has been submitted for review. We'll notify you once it's approved.",
        [
          {
            text: "Go to Dashboard",
            // onPress: () => router.replace("/(protected)/dashboard"),
          },
        ],
      )
    } catch (error) {
      setIsSubmitting(false)
      Alert.alert(
        "Submission Failed",
        "There was an error submitting your listing. Please try again.",
        [{ text: "OK" }],
      )
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText fontBold className="text-xl">
              Submit Listing
            </FancyText>
          ),
        }}
      />
      <StackView direction="horizontal" className="fixed justify-between px-6 py-4 top-0 left-0">
        <FancyText fontBold>12 of 12</FancyText>
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
      <ScrollView className="flex-1 px-6 pt-4">
        <View className="mb-8">
          <FancyText className="text-3xl font-bold mb-2">Ready to Share Your Car</FancyText>
          <Text className="text-zinc-600">
            Your vehicle details have been collected. Review the information below and submit your
            listing.
          </Text>
        </View>

        {/* Summary Section */}
        <View className="bg-zinc-50 rounded-lg p-5 mb-6">
          <FancyText fontBold className="text-lg mb-4">
            Listing Summary
          </FancyText>

          <SummaryItem
            label="Vehicle"
            value={`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`}
          />
          <SummaryItem label="License Plate" value={vehicleInfo.licensePlate} />
          <SummaryItem label="Location" value={vehicleInfo.location} />
          <SummaryItem label="Photos" value={`${vehicleInfo.images} uploaded`} />
          <SummaryItem label="Pricing" value={vehicleInfo.pricing} />
        </View>

        {/* Next Steps */}
        <View className="bg-blue-50 rounded-lg p-5 mb-6">
          <FancyText fontBold className="text-lg mb-2">
            What happens next?
          </FancyText>

          <View className="mb-3">
            <FancyText fontBold className="mb-1">
              1. Review Process
            </FancyText>
            <Text className="text-zinc-600">
              Our team will review your listing within 24-48 hours to ensure it meets our
              standards.
            </Text>
          </View>

          <View className="mb-3">
            <FancyText fontBold className="mb-1">
              2. Listing Goes Live
            </FancyText>
            <Text className="text-zinc-600">
              Once approved, your vehicle will appear in search results and be available for
              booking.
            </Text>
          </View>

          <View>
            <FancyText fontBold className="mb-1">
              3. Start Earning
            </FancyText>
            <Text className="text-zinc-600">
              You'll receive notifications when guests request to book your vehicle.
            </Text>
          </View>
        </View>

        {/* Legal Agreement */}
        <View className="bg-zinc-100 rounded-lg p-5 mb-10">
          <FancyText fontBold className="mb-2">
            Terms & Conditions
          </FancyText>
          <Text className="text-zinc-600 text-sm mb-2">
            By submitting your listing, you confirm that all information provided is accurate and
            your vehicle meets our safety standards. You agree to our Terms of Service and Host
            Policies.
          </Text>
        </View>

        <View className="h-20" />
      </ScrollView>
      <FixedBottomView className="h-[97px]">
        <NiceButton onPress={handleSubmitListing} disabled={isSubmitting}>
          {isSubmitting ? (
            <View className="flex-row items-center">
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text className="text-white ml-2">Submitting...</Text>
            </View>
          ) : (
            "Submit Listing"
          )}
        </NiceButton>
      </FixedBottomView>
    </>
  )
}

interface SummaryItemProps {
  label: string
  value: string
}

const SummaryItem = ({ label, value }: SummaryItemProps) => {
  return (
    <View className="flex-row justify-between py-2 border-b border-zinc-200 last:border-b-0">
      <Text className="text-zinc-600">{label}</Text>
      <FancyText fontBold>{value}</FancyText>
    </View>
  )
}
