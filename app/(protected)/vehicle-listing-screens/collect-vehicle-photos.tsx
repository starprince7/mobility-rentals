import React from "react"
import { Stack, useRouter } from "expo-router"
import { View, Text, Pressable, Image, ScrollView, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import { FancyText, FixedBottomView, NiceButton, StackView } from "@/components/ui"
import {
  selectVehicleOnboardingStore,
  addVehiclePhoto,
  removeVehiclePhoto,
  uploadVehiclePhotos,
} from "@/store/vehicle-onboarding-data/reducer"
import { MaterialCommunityIcons } from "@expo/vector-icons"

// Define the photo category type
type PhotoCategory = "exterior" | "interior" | "damage"

export default function CollectVehiclePhotosScreen() {
  const router = useRouter()
  const dispatch = useDispatch()

  // Get photos from Redux store
  const {
    photos,
    data: vehicleData,
    vechicleId,
  } = useSelector(selectVehicleOnboardingStore)

  const photoRequirements = [
    {
      id: "exterior" as PhotoCategory,
      title: "Exterior photos",
      required: 4,
      description: "Front, back, both sides",
      icon: "car",
    },
    {
      id: "interior" as PhotoCategory,
      title: "Interior photos",
      required: 2,
      description: "Driver seat, back seats",
      icon: "car-arrow-left",
    },
    {
      id: "damage" as PhotoCategory,
      title: "Any damage or scratches",
      required: 0,
      description: "Optional, for transparency",
      icon: "car-info",
    },
  ]

  const pickImage = async (category: PhotoCategory) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos to continue.",
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Dispatch action to add photo to Redux store
      dispatch(
        addVehiclePhoto({
          category,
          photoUri: result.assets[0].uri,
        }),
      )
    }
  }

  const takePhoto = async (category: PhotoCategory) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your camera to continue.",
      )
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Dispatch action to add photo to Redux store
      dispatch(
        addVehiclePhoto({
          category,
          photoUri: result.assets[0].uri,
        }),
      )
    }
  }

  const removePhoto = (category: PhotoCategory, index: number) => {
    // Dispatch action to remove photo from Redux store
    dispatch(removeVehiclePhoto({ category, index }))
  }

  const handleSubmit = async () => {
    // Check if we have the required photos
    if (!isFormComplete) {
      Alert.alert(
        "Missing Required Photos",
        "Please add the required exterior and interior photos before continuing.",
      )
      return
    }

    try {
      // Upload photos to API
      await dispatch<any>(
        uploadVehiclePhotos({
          photos,
          vehicleId: vechicleId!,
        }),
      ).unwrap()

      // Navigate to next screen after successful upload
      //   router.push(
      //     "/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_pricing",
      //   )
    } catch (error) {
      console.error("Failed to upload photos:", error)
    }
  }

  const isFormComplete = React.useMemo(() => {
    return photos.exterior.length >= 4 && photos.interior.length >= 2
  }, [photos])

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText fontBold className="text-xl">
              Vehicle Photos
            </FancyText>
          ),
        }}
      />
      <StackView
        direction="horizontal"
        className="fixed justify-between px-6 py-4 top-0 left-0"
      >
        <FancyText fontBold>5 of 12</FancyText>
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

      <ScrollView className="flex-1 px-6 pt-5 pb-24 mb-24">
        <FancyText className="text-3xl font-bold mb-2">Add vehicle photos</FancyText>
        <Text className="text-gray-600 mb-6">
          High-quality photos help guests choose the right vehicle and increase your
          booking rate.
        </Text>

        {photoRequirements.map((category) => (
          <View key={category.id} className="mb-8">
            <View className="flex-row items-center mb-2">
              <MaterialCommunityIcons
                name={category.icon as any}
                size={20}
                color="#333"
              />
              <FancyText className="text-xl font-semibold ml-2">
                {category.title}
              </FancyText>
              {category.required > 0 && (
                <View className="flex-row items-center ml-2">
                  <Text
                    className={`${
                      photos[category.id].length >= category.required
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    ({photos[category.id].length}/{category.required} required)
                  </Text>
                  {photos[category.id].length >= category.required && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={16}
                      color="#10b981"
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </View>
              )}
            </View>

            <Text className="text-gray-600 mb-4">{category.description}</Text>

            <View className="flex-row flex-wrap">
              {photos[category.id].map((uri, index) => (
                <View key={index} className="mr-4 mb-4 relative">
                  <Image source={{ uri }} className="w-24 h-24 rounded-lg" />
                  <Pressable
                    onPress={() => removePhoto(category.id, index)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <MaterialCommunityIcons name="close" size={14} color="white" />
                  </Pressable>
                </View>
              ))}

              <Pressable
                onPress={() =>
                  Alert.alert("Add Photo", "Choose how you want to add a photo", [
                    { text: "Camera", onPress: () => takePhoto(category.id) },
                    { text: "Gallery", onPress: () => pickImage(category.id) },
                    { text: "Cancel", style: "cancel" },
                  ])
                }
                className="w-24 h-24 bg-gray-200 rounded-lg items-center justify-center mr-4 mb-4"
              >
                <MaterialCommunityIcons name="plus" size={32} color="#666" />
              </Pressable>
            </View>
          </View>
        ))}

        <View className="bg-blue-50 p-4 rounded-lg mb-8">
          <FancyText className="font-semibold mb-2">Photo tips:</FancyText>
          <Text className="text-gray-700">• Take photos in good lighting</Text>
          <Text className="text-gray-700">• Make sure the vehicle is clean</Text>
          <Text className="text-gray-700">• Show all angles of the vehicle</Text>
          <Text className="text-gray-700">• Include any unique features</Text>
        </View>
      </ScrollView>

      <FixedBottomView className="h-[97px]">
        <NiceButton onPress={handleSubmit} disabled={!isFormComplete}>
          {isFormComplete ? "Continue" : "Add required photos"}
        </NiceButton>
      </FixedBottomView>
    </>
  )
}
