import React from "react"
import { Stack, useRouter } from "expo-router"
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  SafeAreaView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
// Redux
import {
  FancyText,
  FixedBottomView,
  NiceButton,
  StackView,
} from "@/components/ui"
import { selectAuth } from "@/store/auth-data/reducer"
import {
  postEmailVerificationCode,
  selectVerificationCodes,
  setVerificationCode,
} from "@/store/verification-codes/reducer"
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton"

export default function EnterEmailVerificationScreen() {
  const inputRef = React.useRef<TextInput>(null)

  const router = useRouter()
  const dispatch = useDispatch()
  const authStore = useSelector(selectAuth)
  const verificationStore = useSelector(selectVerificationCodes)
  const { verificationCode } = verificationStore

  const handleInputFocus = () => {
    inputRef.current?.focus()
  }

  // Handle text change by dispatching to Redux
  const handleTextChange = (text: string) => {
    dispatch(setVerificationCode(text))
  }

  const handleSubmit = () => {
    dispatch<any>(
      postEmailVerificationCode(verificationStore?.verificationCode),
    )
  }

  // Check if all fields are filled
  const isFormComplete = React.useMemo(() => {
    return verificationStore?.verificationCode
  }, [verificationStore?.verificationCode])

  // Handles routing based on correctness of verification code
  React.useEffect(() => {
    if (verificationStore?.networkStatus === "succeeded") {
      router.push(
        "/(protected)/vehicle-listing-screens/confirm-mobile-number",
      )
    }
    if (verificationStore?.networkStatus === "failed") {
      alert("Verification code is incorrect.")
    }
  }, [
    verificationStore?.networkStatus,
    verificationStore?.verificationCode,
  ])

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          headerTitle: () => <FancyText>Enter code</FancyText>,
        }}
      />
      <View className="bg-gray-200 mb-3">
        <GoBackButtonFloating
          size={20}
          type="close"
          color="black"
          className="top-3 shadow"
        />
        <View className="">
          <FancyText className="text-center py-4 font-bold text-xl">
            Verification
          </FancyText>
        </View>
      </View>
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <View className="flex-1 px-6 pt-5 gap-y-4">
          <FancyText className="text-zinc-800">
            We sent a code to your email address:
          </FancyText>
          <FancyText className="text-base" fontBold>
            {authStore?.user?.email || "johndoe@gmail.com"}
          </FancyText>
          <Pressable onPress={handleInputFocus}>
            <StackView
              direction="horizontal"
              className="justify-between mt-3 border-t border-b border-zinc-300 py-4"
            >
              <FancyText className="text-lg">Lapp Code:</FancyText>
              <TextInput
                ref={inputRef}
                placeholder="Enter the code"
                className="rounded-md p-2 text-right"
                autoCapitalize="characters"
                value={verificationStore?.verificationCode}
                onChangeText={handleTextChange}
                keyboardType="number-pad"
              />
            </StackView>
          </Pressable>
          <StackView direction="horizontal" className="mx-auto">
            <FancyText className="text-zinc-700">
              Didn't receive the code?{" "}
            </FancyText>
            <NiceButton
              variant="text"
              size="small"
              className="text-xs"
            >
              Resend code
            </NiceButton>
          </StackView>
          <StackView
            direction="horizontal"
            className="justify-center -mt-3"
          >
            <FancyText className="text-zinc-900 text-xs">
              Make sure to also check your spam folder.
            </FancyText>
          </StackView>
        </View>
      </Pressable>
      <FixedBottomView className="h-[97px]">
        <NiceButton
          loading={verificationStore?.networkStatus === "loading"}
          disabled={!isFormComplete}
          onPress={handleSubmit}
        >
          Submit
        </NiceButton>
      </FixedBottomView>
    </SafeAreaView>
  )
}
