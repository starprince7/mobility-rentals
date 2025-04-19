import React from "react"
import { Stack, useRouter } from "expo-router"
import { View, Text, TextInput, Pressable, Keyboard } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Picker } from "@react-native-picker/picker"
import { ScrollView } from "react-native-gesture-handler"
import { FancyText, FixedBottomView, NiceButton, StackView } from "@/components/ui"
import {
  setVehicleIdentificationNumber,
  setFuelType,
  setMileage,
  setMilesPerGallon,
  setSeatingCapacity,
  setTransmission,
  setVehicleColor,
  setVehicleCondition,
  setVehicleStatus,
  setVehicleType,
  selectVehicleOnboardingStore,
} from "@/store/vehicle-onboarding-data/reducer"

type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid'
type Transmission = 'automatic' | 'manual'
type VehicleType = 'sedan' | 'suv' | 'truck' | 'van' | 'luxury' | 'sports' | 'compact' | 'other'
type VehicleCondition = 'new' | 'like-new' | 'good' | 'fair' | 'poor'
type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'unavailable'

export default function CollectPhysicalVehicleDetailsScreen() {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    fuelType,
    transmission,
    mileage,
    seatingCapacity,
    vehicleType,
    vehicleColor,
    vehicleCondition,
    milesPerGallon,
    vehicleStatus,
    vehicleIdentificationNumber,
  } = useSelector(selectVehicleOnboardingStore)

  // Update Redux store when field changes
  const handleVinChange = (text: string) => {
    dispatch(setVehicleIdentificationNumber(text))
  }

  const handleFuelTypeChange = (value: FuelType) => {
    dispatch(setFuelType(value))
  }

  const handleMileageChange = (text: string) => {
    dispatch(setMileage(text))
  }

  const handleMilesPerGallonChange = (text: string) => {
    dispatch(setMilesPerGallon(Number(text)))
  }

  const handleSeatingCapacityChange = (text: string) => {
    dispatch(setSeatingCapacity(Number(text)))
  }

  const handleTransmissionChange = (value: Transmission) => {
    dispatch(setTransmission(value))
  }

  const handleVehicleColorChange = (text: string) => {
    dispatch(setVehicleColor(text))
  }

  const handleVehicleConditionChange = (value: VehicleCondition) => {
    dispatch(setVehicleCondition(value))
  }

  const handleVehicleStatusChange = (value: VehicleStatus) => {
    dispatch(setVehicleStatus(value))
  }

  const handleVehicleTypeChange = (value: VehicleType) => {
    dispatch(setVehicleType(value))
  }

  const handleSubmit = () => {
    router.push(
      "/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_make_model_year",
    )
  }

  const isFormComplete = React.useMemo(() => {
    return (
      mileage?.trim() !== "" &&
      vehicleColor?.trim() !== "" &&
      milesPerGallon &&
      vehicleIdentificationNumber?.trim() !== ""
    )
  }, [mileage, vehicleColor, milesPerGallon, vehicleIdentificationNumber])

  // Render picker items for different dropdown options
  const renderFuelTypeOptions = () => {
    const options: FuelType[] = ["petrol", "diesel", "electric", "hybrid"]
    return options.map((option) => (
      <Picker.Item
        color="black"
        key={option}
        label={option.charAt(0).toUpperCase() + option.slice(1)}
        value={option}
      />
    ))
  }

  const renderTransmissionOptions = () => {
    const options: Transmission[] = ["automatic", "manual"]
    return options.map((option) => (
      <Picker.Item
        color="black"
        key={option}
        label={option.charAt(0).toUpperCase() + option.slice(1)}
        value={option}
      />
    ))
  }

  const renderVehicleTypeOptions = () => {
    const options: VehicleType[] = [
      "sedan",
      "suv",
      "truck",
      "van",
      "luxury",
      "sports",
      "compact",
      "other",
    ]
    return options.map((option) => (
      <Picker.Item
        color="black"
        key={option}
        label={option.toUpperCase()}
        value={option}
      />
    ))
  }

  const renderVehicleConditionOptions = () => {
    const options: VehicleCondition[] = ["new", "like-new", "good", "fair", "poor"]
    return options.map((option) => (
      <Picker.Item
        color="black"
        key={option}
        label={option.charAt(0).toUpperCase() + option.slice(1)}
        value={option}
      />
    ))
  }

  const renderVehicleStatusOptions = () => {
    const options: VehicleStatus[] = ["available", "rented", "maintenance", "unavailable"]
    return options.map((option) => (
      <Picker.Item
        color="black"
        key={option}
        label={option.charAt(0).toUpperCase() + option.slice(1)}
        value={option}
      />
    ))
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText fontBold className="text-xl">
              Vehicle Details
            </FancyText>
          ),
        }}
      />
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 px-6 pt-4 pb-24 mb-28">
          <StackView
            direction="horizontal"
            className="justify-between px-0 py-4 top-0 left-0"
          >
            <FancyText fontBold>7 of 11</FancyText>
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
          <FancyText className="text-3xl font-bold mb-2">Vehicle Details</FancyText>
          <Text className="mb-6">
            Please provide specific details about your vehicle to help guests find
            the perfect match.
          </Text>

          {/* Vehicle Identification Number */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Vehicle Identification Number (VIN)
            </FancyText>
            <Text className="text-sm text-gray-500 mb-2">
              Required for insurance purposes
            </Text>
            <TextInput
              placeholder="Enter VIN"
              className="border border-zinc-300 rounded-md p-3"
              value={vehicleIdentificationNumber}
              onChangeText={handleVinChange}
            />
          </View>

          {/* Vehicle Type */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Vehicle Type
            </FancyText>
            <View className="border border-zinc-300 rounded-md">
              <Picker
                selectedValue={vehicleType || "sedan"}
                onValueChange={handleVehicleTypeChange}
              >
                {renderVehicleTypeOptions()}
              </Picker>
            </View>
          </View>

          {/* Vehicle Color */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Vehicle Color
            </FancyText>
            <TextInput
              placeholder="Enter vehicle color"
              className="border border-zinc-300 rounded-md p-3"
              value={vehicleColor}
              onChangeText={handleVehicleColorChange}
            />
          </View>

          {/* Mileage */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Current Mileage
            </FancyText>
            <TextInput
              placeholder="Enter current mileage"
              keyboardType="numeric"
              className="border border-zinc-300 rounded-md p-3"
              value={mileage}
              onChangeText={handleMileageChange}
            />
          </View>

          {/* Fuel Type */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">Fuel Type</FancyText>
            <View className="border border-zinc-300 rounded-md">
              <Picker
                selectedValue={fuelType || "petrol"}
                onValueChange={handleFuelTypeChange}
              >
                {renderFuelTypeOptions()}
              </Picker>
            </View>
          </View>

          {/* Miles Per Gallon */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Miles Per Gallon
            </FancyText>
            <TextInput
              placeholder="Enter MPG"
              keyboardType="numeric"
              className="border border-zinc-300 rounded-md p-3"
              value={milesPerGallon?.toString()}
              onChangeText={handleMilesPerGallonChange}
            />
          </View>

          {/* Transmission */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Transmission
            </FancyText>
            <View className="border border-zinc-300 rounded-md">
              <Picker
                selectedValue={transmission || "automatic"}
                onValueChange={handleTransmissionChange}
              >
                {renderTransmissionOptions()}
              </Picker>
            </View>
          </View>

          {/* Seating Capacity */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Seating Capacity
            </FancyText>
            <TextInput
              placeholder="Enter number of seats"
              keyboardType="numeric"
              className="border border-zinc-300 rounded-md p-3"
              value={seatingCapacity as any}
              onChangeText={handleSeatingCapacityChange}
            />
          </View>

          {/* Vehicle Condition */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Vehicle Condition
            </FancyText>
            <View className="border border-zinc-300 rounded-md">
              <Picker
                selectedValue={vehicleCondition || "good"}
                onValueChange={handleVehicleConditionChange}
              >
                {renderVehicleConditionOptions()}
              </Picker>
            </View>
          </View>

          {/* Vehicle Status */}
          <View className="mb-6">
            <FancyText className="text-lg font-semibold mb-1">
              Vehicle Status
            </FancyText>
            <View className="border border-zinc-300 rounded-md">
              <Picker
                selectedValue={vehicleStatus || "available"}
                onValueChange={handleVehicleStatusChange}
              >
                {renderVehicleStatusOptions()}
              </Picker>
            </View>
          </View>
        </ScrollView>
        <FixedBottomView className="h-[97px]">
          <NiceButton onPress={handleSubmit} disabled={!isFormComplete}>
            Continue
          </NiceButton>
        </FixedBottomView>
      </Pressable>
    </>
  )
}