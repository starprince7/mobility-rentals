import { View } from "react-native";
import React from "react";
import { LocationIndicator } from "./LocationIndicator";
import { NotificationBell } from "./NotificationBell";
import { Avatar } from "./ui";

const localSource = require("@/assets/images/avatar-portrait.jpg");

export function Header() {
  return (
    <View className="px-6 flex-row justify-between items-center">
      <LocationIndicator value="Lagos, Nigeria" className="text-neutral-500" />
      <View className="flex-row gap-4 items-center">
        <NotificationBell />
        <Avatar size="small" localSource={localSource} />
      </View>
    </View>
  );
}
