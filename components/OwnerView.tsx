import { View, Text } from "react-native";
import React from "react";
import { Avatar, FancyText, NiceButton, StackView } from "./ui";
import { LocationIndicator } from "./LocationIndicator";

const localSource = require("@/assets/images/avatar-portrait.jpg");

export function OwnerView() {
  return (
    <View className="mx-6 bg-neutral-200 border border-neutral-300 pt-5 mt-1 mb-2 rounded-3xl">
      <StackView direction="horizontal" className="gap-3 px-6">
        <Avatar size="large" localSource={localSource} />
        <StackView direction="vertical">
          <FancyText className="font-semibold text-lg mb-1">John Doe</FancyText>
          <LocationIndicator
            className="text-neutral-400 font-normal text-xs"
            iconColor="#a3a3a3"
            iconSize={13}
            value={["Lagos, Nigeria", "Lekki Phase 1"]}
          />
        </StackView>
      </StackView>
      <NiceButton size="small" className="text-sm">Contact Owner</NiceButton>
    </View>
  );
}
