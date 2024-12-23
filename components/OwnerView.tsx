import { View, Text } from "react-native";
import React from "react";
import { Avatar, FancyText, NiceButton, StackView } from "./ui";

const localSource = require("@/assets/images/avatar-portrait.jpg");

export function OwnerView() {
  return (
    <View className="mx-6 bg-neutral-300 pt-5 mt-1 mb-2 rounded-3xl">
      <StackView direction="horizontal" className="gap-3 px-6">
        <Avatar size="large" localSource={localSource} />
        <StackView direction="vertical">
          <FancyText className="font-semibold text-xl">John Doe</FancyText>
          <FancyText>Owner</FancyText>
        </StackView>
      </StackView>
      <NiceButton>Contact me</NiceButton>
    </View>
  );
}
