import { View } from "react-native"
import * as ImagePicker from "expo-image-picker"
import React from "react"
import {
  FancyText,
  FixedBottomView,
  NiceButton,
  NiceImage,
  StackView,
} from "@/components/ui"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { router, Stack } from "expo-router"
import {
  selectProfileImageStore,
  setImage,
  submitProfileImage,
} from "@/store/profile-photo/reducer"
import { useDispatch, useSelector } from "react-redux"

export default function CollectProfileInformation() {
  // const [image, setImage] = React.useState("")
  const dispatch = useDispatch()
  const { image, networkStatus } = useSelector(
    selectProfileImageStore,
  )

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    // if (permissionResult.granted === false) {
    //     alert("Permission to access camera roll is required!")
    //     return
    // }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      dispatch(setImage(result.assets[0] as any))
      return
    }
  }

  /**
   * This effect subscribes to the redux store to know when image 
   * upload has succeeded in other for screen navigation to happen
   */
  React.useEffect(() => {
    if (networkStatus === "succeeded") {
      router.push(
        "/(protected)/vehicle-listing-screens/confirm-mobile-number",
      )
    }
  }, [networkStatus])

  const handleSaveAndContinue = () => {
    // dispatch<any>(submitProfileImage(image)) // Disabled because No Live Backend Yet!
    router.push(
      "/(protected)/vehicle-listing-screens/confirm-mobile-number",
      // "/(protected)/(verification)/send-email-verification"
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: "Profile photo" }} />
      <StackView
        direction="horizontal"
        className="fixed justify-between px-6 py-4 top-0 left-0"
      >
        <FancyText fontBold>2 of 12</FancyText>
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
            Add profile photo
          </FancyText>
          <FancyText className="text-zinc-700">
            Adding a photo helps hosts and guests recognize each other
            when picking up the car.
          </FancyText>

          <StackView
            direction="vertical"
            className="my-4 py-14 items-center"
          >
            {!image && (
              <MaterialCommunityIcons
                name="account-convert-outline"
                size={150}
                color="#d4d4d8"
              />
            )}
            {image && (
              <NiceImage
                source={{ uri: image.uri }}
                className="h-60 w-60 rounded-full"
              />
            )}
          </StackView>
          <NiceButton
            variant="outline"
            size="small"
            onPress={pickImage}
            className="w-full"
          >
            {!image ? "Add a photo" : "Change photo"}
          </NiceButton>
        </View>
        <FixedBottomView className="h-[97px]">
          <NiceButton
            onPress={handleSaveAndContinue}
            loading={networkStatus === "loading"}
            disabled={!image}
          >
            Save and continue
          </NiceButton>
        </FixedBottomView>
      </View>
    </>
  )
}
