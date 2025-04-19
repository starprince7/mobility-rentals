import { View, ScrollView, SafeAreaView, Button } from "react-native";
import React from "react";
import { FancyInput, FancyText, NiceButton, StackView } from "@/components/ui";

export default function SignupScreen() {
  return (
    <SafeAreaView className="flex-1 mx-6">
      <StackView direction="horizontal" className="justify-center">
        <FancyText className="font-semibold android:mt-4 mt-2 text-lg py-2 tracking-wide">
          Create Account
        </FancyText>
      </StackView>
      <ScrollView contentContainerClassName="pb-60 flex-1">
        <View className="py-20 justify-center items-center">
          <FancyText className="text-5xl font-extrabold tracking-widest">
            Renit
          </FancyText>
        </View>
        <View className=" justify-center items-center gap-3">
          <StackView
            direction="horizontal"
            className="gap-2 w-full android:h-16"
          >
            <FancyInput
              keyboardType="default"
              label="First Name"
              placeholder="Enter your first name"
              className="flex-1"
            />
            <FancyInput
              keyboardType="default"
              label="Last Name"
              placeholder="Enter your last name"
              className="flex-1"
            />
          </StackView>
          <FancyInput
            keyboardType="email-address"
            label="Email"
            placeholder="Your email address"
            className="w-full"
          />
          <FancyInput
            secureTextEntry
            label="Password"
            placeholder="Your password"
            className="w-full"
          />
          <NiceButton className="w-full">Create</NiceButton>
        </View>
        <View className="my-4 mb-20">
          <NiceButton className="" variant="text">
            Terms and Conditions of Use
          </NiceButton>
        </View>
      </ScrollView>
      <StackView
        direction="horizontal"
        className="gap-3 justify-center mb-6 w-full"
      >
        <NiceButton size="small" className="flex-1" variant="outline">
          SIGN IN
        </NiceButton>
        <NiceButton className="py-3.5" variant="outline">
          G
        </NiceButton>
      </StackView>
    </SafeAreaView>
  );
}
