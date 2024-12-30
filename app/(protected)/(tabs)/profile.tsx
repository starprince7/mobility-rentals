import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Avatar, FancyText, NiceButton, StackView } from "@/components/ui";
import { LocationIndicator } from "@/components";

const localSource = require("@/assets/images/avatar-portrait.jpg");

export default function profileScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 gap-10 mx-6 mt-6">
        <StackView direction="horizontal" className="gap-5">
          <Avatar size="larger" localSource={localSource} />
          <StackView direction="vertical" className="gap-2">
            <FancyText className="text-3xl font-bold">Jane Doe</FancyText>
            <StackView
              direction="horizontal"
              className="gap-6 justify-between"
            >
              <StackView direction="vertical" className="gap-2 items-center">
                <FancyText className="text-base text-neutral-500">
                  Active Earnings
                </FancyText>
                <FancyText className="text-2xl">$100.00</FancyText>
              </StackView>
              <StackView direction="vertical" className="gap-2 items-center">
                <FancyText className="text-base text-neutral-500">
                  Listings
                </FancyText>
                <FancyText className="text-2xl">30</FancyText>
              </StackView>
            </StackView>
          </StackView>
        </StackView>
        <StackView direction="horizontal" className="gap-20 justify-between">
          <StackView direction="vertical" className="gap-2">
            <FancyText className="text-base text-neutral-500">
              Active Earnings
            </FancyText>
            <FancyText className="text-2xl">$100.00</FancyText>
          </StackView>
          <StackView direction="vertical" className="gap-2">
            <FancyText className="text-base text-neutral-500">
              Listings
            </FancyText>
            <FancyText className="text-2xl">30</FancyText>
          </StackView>
        </StackView>
      </View>
      <View className="flex-1 shadow-lg px-6 rounded-2xl">
        <NiceButton className="mt-auto mb-6">Log out</NiceButton>
      </View>
    </SafeAreaView>
  );
}
