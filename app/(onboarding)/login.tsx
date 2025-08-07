import React from "react"
import { useNavigation } from "expo-router"
import { View, SafeAreaView, ScrollView } from "react-native"
import { FancyInput, FancyText, NiceButton, StackView } from "@/components/ui"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth } from "@/store/auth-data/reducer"
import { signInWithCredentials, clearError } from "@/store/auth-data/reducer"
import { SignInData } from "@/types/user"

export default function LoginScreen() {
  const dispatch = useDispatch()
  const { authRequestStatus, error } = useSelector(selectAuth)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Validate on change for immediate feedback
  })
  const navigation = useNavigation()
  
  const onSubmit = (data: SignInData) => {
    // Clear any previous errors
    dispatch(clearError())
    // Attempt login
    dispatch(signInWithCredentials(data) as any)
  }

  return (
    <SafeAreaView className="flex-1 mx-6">
      <ScrollView contentContainerClassName="pb-40 flex-1">
        <View className="py-32 ios:py-20 justify-center items-center">
          <FancyText className="text-5xl font-extrabold tracking-widest">Renit</FancyText>
        </View>
        <View className=" justify-center items-center gap-6">
        {error && authRequestStatus === "failed" && (
            <View className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
              <FancyText className="text-red-600 text-center text-sm">
                {error}
              </FancyText>
            </View>
          )}
          <FancyInput
            keyboardType="email-address"
            label="Email"
            className="w-full"
            placeholder="Your email address"
            name="email"
            control={control as any}
            rules={{ required: "Email is required" }}
          />
          <FancyInput
            secureTextEntry
            label="Password"
            className="w-full"
            placeholder="Your password"
            name="password"
            control={control as any}
            rules={{ required: "Password is required" }}
          />
          
          <NiceButton
            loading={authRequestStatus === "loading"}
            onPress={handleSubmit(onSubmit)}
            className="w-full"
          >
            Login
          </NiceButton>
          <NiceButton className="" variant="text">
            Forgot password?
          </NiceButton>
        </View>
      </ScrollView>
      <StackView direction="vertical" className="gap-3 justify-center w-full">
        <NiceButton
          className="rounded-full"
          variant="outline"
          href="/(onboarding)/signup"
          size="small"
        >
          Sign up
        </NiceButton>
        <NiceButton
          className="rounded-full"
          variant="outline"
          onPress={() => alert("Sign up with Google?")}
        >
          G
        </NiceButton>
      </StackView>
    </SafeAreaView>
  )
}
