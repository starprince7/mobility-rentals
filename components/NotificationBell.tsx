import { View, Text } from "react-native";
import React from "react";
import { BellIcon } from "react-native-heroicons/solid";

export function NotificationBell() {
  return (
    <View style={{ padding: 5, borderRadius: 10 }}>
      <BellIcon size={30} color="#3F3F3F" />
    </View>
  );
}
