import { Pressable, View, Text, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import React, { useState } from "react"
import { router, Stack } from "expo-router"
import { useDispatch, useSelector } from "react-redux"

// icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import {
  FancyText,
  FixedBottomView,
  NiceButton,
  NiceImage,
  StackView,
} from "@/components/ui"

// Redux
import {
  selectDriversLicense,
  setFrontImage,
  setBackImage,
  submitDriversLicense,
} from "@/store/drivers-license/reducer"

// types
import { MediaAsset } from "@/types/files"

type ImageSide = "front" | "back"

export default function CollectDriversLicense(): JSX.Element {
  const dispatch = useDispatch()
  const { backImage, frontImage } = useSelector(selectDriversLicense)
  const [networkStatus, setNetworkStatus] = useState<
    "idle" | "loading"
  >("idle")

  // Function to handle image selection with options for camera or gallery
  const handleImageSelect = async (
    side: ImageSide,
  ): Promise<void> => {
    const options = ["Take a photo", "Choose from gallery", "Cancel"]
    Alert.alert(
      `${side === "front" ? "Front" : "Back"} of license`,
      "Select an option",
      [
        {
          text: options[0],
          onPress: () => captureImage(side),
        },
        {
          text: options[1],
          onPress: () => pickImage(side),
        },
        {
          text: options[2],
          style: "cancel",
        },
      ],
      { cancelable: true },
    )
  }

  // Function to capture image using camera
  const captureImage = async (side: ImageSide): Promise<void> => {
    try {
      const { status } =
        await ImagePicker.requestCameraPermissionsAsync()

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera permissions to make this work!",
        )
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (
        !result.canceled &&
        result.assets &&
        result.assets.length > 0
      ) {
        if (side === "front") {
          dispatch(setFrontImage(result.assets[0] as MediaAsset))
        } else {
          dispatch(setBackImage(result.assets[0] as MediaAsset))
        }
      }
    } catch (error) {
      console.error("Error capturing image:", error)
      Alert.alert(
        "Error",
        "Failed to capture image. Please try again.",
      )
    }
  }

  // Function to pick image from gallery
  const pickImage = async (side: ImageSide): Promise<void> => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need gallery permissions to make this work!",
        )
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (
        !result.canceled &&
        result.assets &&
        result.assets.length > 0
      ) {
        if (side === "front") {
          dispatch(setFrontImage(result.assets[0] as MediaAsset))
        } else {
          dispatch(setBackImage(result.assets[0] as MediaAsset))
        }
      }
    } catch (error) {
      console.error("Error picking image:", error)
      Alert.alert(
        "Error",
        "Failed to select image. Please try again.",
      )
    }
  }

  // Functions to handle front/back image capture or selection
  const handleFrontImage = (): void => {
    handleImageSelect("front")
  }

  const handleBackImage = (): void => {
    handleImageSelect("back")
  }

  return (
    <>
      <Stack.Screen options={{ title: "Driver's License" }} />
      <StackView
        direction="horizontal"
        className="fixed justify-between px-6 py-4 top-0 left-0"
      >
        <FancyText fontBold>4 of 12</FancyText>
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
      <View className="flex-1">
        <View className="flex-1 px-6 pt-2 gap-y-4">
          <FancyText className="text-3xl font-bold">
            Driver's license photo
          </FancyText>
          <FancyText className="text-zinc-700">
            Capture the front and back of your driver's license
          </FancyText>

          <StackView
            direction="horizontal"
            className="my-4 py-8 items-center justify-between gap-4"
          >
            {/* Front side image */}
            <Pressable
              className="border h-60 flex-1 rounded-lg border-zinc-400 bg-zinc-300 p-0.5 items-center justify-center"
              onPress={handleFrontImage}
            >
              {frontImage ? (
                <View className="w-full h-full relative">
                  <NiceImage
                    source={{ uri: frontImage.uri }}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                    <Text className="text-white font-medium">
                      Front
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="items-center justify-center">
                  <MaterialCommunityIcons
                    name="card-account-details-outline"
                    size={64}
                    color="#71717a"
                  />
                  <Text className="text-zinc-600 font-medium mt-2">
                    Front
                  </Text>
                </View>
              )}
            </Pressable>

            {/* Back side image */}
            <Pressable
              className="border h-60 flex-1 rounded-lg border-zinc-400 bg-zinc-300 p-0.5 items-center justify-center"
              onPress={handleBackImage}
            >
              {backImage ? (
                <View className="w-full h-full relative">
                  <NiceImage
                    source={{ uri: backImage.uri }}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                    <Text className="text-white font-medium">
                      Back
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="items-center justify-center">
                  <MaterialCommunityIcons
                    name="card-account-details-outline"
                    size={64}
                    color="#71717a"
                  />
                  <Text className="text-zinc-600 font-medium mt-2">
                    Back
                  </Text>
                </View>
              )}
            </Pressable>
          </StackView>

          <FancyText className="text-zinc-600 text-center">
            Tap on either box to upload or take a photo
          </FancyText>
        </View>

        <FixedBottomView className="h-[97px]">
          <NiceButton
            onPress={() => {
              router.push(
                "/(protected)/vehicle-listing-screens/confirm-mobile-number",
              )
              // dispatch<any>(
              //   submitDriversLicense({ frontImage, backImage }),
              // )
            }}
            loading={networkStatus === "loading"}
            disabled={!frontImage || !backImage}
          >
            Save and continue
          </NiceButton>
        </FixedBottomView>
      </View>
    </>
  )
}
