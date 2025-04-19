import { View, Text, SafeAreaView, ScrollView, Button } from "react-native";
import React from "react";
import { FancyInput, FancyText, NiceButton, StackView } from "@/components/ui";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 mx-6">
      <ScrollView contentContainerClassName="pb-40 flex-1">
        <View className="py-32 ios:py-20 justify-center items-center">
          <FancyText className="text-5xl font-extrabold tracking-widest">
            Renit
          </FancyText>
        </View>
        <View className=" justify-center items-center gap-3">
          <FancyInput
            keyboardType="email-address"
            label="Email"
            className="w-full"
            placeholder="Your email address"
          />
          <FancyInput
            secureTextEntry
            label="Password"
            className="w-full"
            placeholder="Your password"
          />
          <NiceButton className="w-full">Login</NiceButton>
        </View>
        <NiceButton className="" variant="text">
          Forgot password?
        </NiceButton>
      </ScrollView>
      <StackView
        direction="horizontal"
        className="gap-3 justify-center mb-6 w-full"
      >
        <NiceButton size="small" className="flex-1" variant="outline">
          CREATE AN ACCOUNT
        </NiceButton>
        <NiceButton className="py-3.5" variant="outline">
          G
        </NiceButton>
      </StackView>
    </SafeAreaView>
  );
}
