import React from "react"
import { View, ScrollView, SafeAreaView } from "react-native"
import { FancyInput, FancyText, NiceButton, StackView } from "@/components/ui"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth, signUpWithCredentials } from "@/store/auth-data/reducer"
import { SignUpData } from "@/types/user"


export default function SignupScreen() {
  const dispatch = useDispatch()
  const { authRequestStatus } = useSelector(selectAuth)
  // Initialize the form with react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onChange", // Validate on change for immediate feedback
  })

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required"
    }
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumber = /[0-9]/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    }

    return true
  }

  const handleCreateAccount = handleSubmit((data) => {
    dispatch(signUpWithCredentials(data) as any)
  })

  return (
    <SafeAreaView className="flex-1 mx-6">
      <StackView direction="horizontal" className="justify-center">
        <FancyText className="font-semibold android:mt-4 mt-2 text-lg py-2 tracking-wide">
          Create Account
        </FancyText>
      </StackView>
      <ScrollView contentContainerClassName="pb-60 flex-1">
        <View className="py-16 justify-center items-center">
          <FancyText className="text-5xl font-extrabold tracking-widest">Renit</FancyText>
        </View>
        <View className="justify-center items-center gap-6">
          <StackView direction="horizontal" className="gap-2 w-full android:h-16">
            <FancyInput
              keyboardType="default"
              label="First Name"
              placeholder="Enter your first name"
              className="flex-1"
              name="firstName"
              control={control as any}
              rules={{ required: "First name is required" }}
            />
            <FancyInput
              keyboardType="default"
              label="Last Name"
              placeholder="Enter your last name"
              className="flex-1"
              name="lastName"
              control={control as any}
              rules={{ required: "Last name is required" }}
            />
          </StackView>
          <FancyInput
            keyboardType="email-address"
            label="Email"
            placeholder="Your email address"
            className="w-full"
            name="email"
            control={control as any}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
          <FancyInput
            secureTextEntry
            label="Password"
            placeholder="Your password"
            className="w-full"
            name="password"
            control={control as any}
            rules={{
              required: "Password is required",
              validate: validatePassword,
            }}
          />
          <NiceButton
            className="w-full"
            loading={authRequestStatus === "loading"}
            onPress={handleCreateAccount}
          >
            Create Account
          </NiceButton>
        </View>
      </ScrollView>
      <StackView direction="vertical" className="gap-3 justify-center w-full">
        <NiceButton className="" variant="text">
          Terms and Conditions of Use
        </NiceButton>
        <NiceButton
          size="small"
          variant="outline"
          className="rounded-full"
          href="/(onboarding)/login"
        >
          SIGN IN
        </NiceButton>
        <NiceButton
          variant="outline"
          className="rounded-full"
          onPress={() => alert("Sign in with Google?")}
        >
          G
        </NiceButton>
      </StackView>
    </SafeAreaView>
  )
}
