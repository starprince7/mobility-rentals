import React from "react"
import { Stack, useRouter } from "expo-router"
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
// Redux
import {
  FancyText,
  FixedBottomView,
  NiceButton,
  StackView,
} from "@/components/ui"
import { selectAuth, setPhone } from "@/store/auth-data/reducer"
import {
  selectVerificationCodes,
  setVerificationCode,
  submitMobileVerificationCode,
} from "@/store/verification-codes/reducer"

export default function CollectMobileNumber() {
  const inputRef = React.useRef<TextInput>(null)

  const router = useRouter()
  const dispatch = useDispatch()
  const authStore = useSelector(selectAuth)
  const { verificationCode, networkStatus } = useSelector(
    selectVerificationCodes,
  )

  const handleInputFocus = () => {
    inputRef.current?.focus()
  }

  // Handle text change by dispatching to Redux
  const handleTextChange = (text: string) => {
    dispatch(setVerificationCode(text))
  }

  const handleSubmit = () => {
    dispatch<any>(submitMobileVerificationCode(verificationCode))
    // Remove the code below since routing is handled by `React.useEffect`.
    router.push(
      // "/(protected)/vehicle-listing-screens/collect-goals-of-host",
      "/(protected)/vehicle-listing-screens/collect-drivers-license",
    ) // Should comment out later
  }

  const isFormComplete = React.useMemo(() => {
    return verificationCode
  }, [verificationCode])

  React.useEffect(() => {
    if (networkStatus === "succeeded") {
      router.push(
        "/(protected)/(verification)/enter-email-verification",
      )
    }
    if (networkStatus === "failed") {
      alert("Verification code is incorrect.")
    }
  }, [networkStatus])

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText>Confim mobile number</FancyText>
          ),
        }}
      />
      <StackView
        direction="horizontal"
        className="fixed justify-between px-6 py-4 top-0 left-0"
      >
        <FancyText fontBold>3 of 12</FancyText>
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
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <View className="flex-1 px-6 pt-4 gap-y-4">
          <FancyText className="text-3xl font-bold">
            Confirm mobile number
          </FancyText>
          <FancyText>
            Please enter the code sent to {authStore?.phone}
          </FancyText>
          <Pressable onPress={handleInputFocus}>
            <StackView
              direction="horizontal"
              className="justify-between mt-3 border-t border-b border-zinc-300 py-4"
            >
              <FancyText className="text-lg">Code</FancyText>
              <TextInput
                ref={inputRef}
                placeholder="Enter authentication code"
                className="rounded-md p-2 text-right"
                autoCapitalize="characters"
                value={authStore?.phone}
                onChangeText={handleTextChange}
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
        </View>
        <FixedBottomView className="h-[97px]">
          <NiceButton
            onPress={handleSubmit}
            disabled={!isFormComplete}
            loading={networkStatus === "loading"}
          >
            Continue
          </NiceButton>
        </FixedBottomView>
      </Pressable>
    </>
  )
}
