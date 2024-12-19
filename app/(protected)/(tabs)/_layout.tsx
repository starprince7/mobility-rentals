import React from "react";
import { Tabs } from "expo-router";
import {
  HomeIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/solid";

export default function BottomNavigationTab() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff", // add your color code as you like,
        headerShown: false,
        tabBarStyle: { backgroundColor: "black", paddingTop: 2 },
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        // tabBarStyle: Platform.select({
        //   ios: {
        //     // Use a transparent background on iOS to show the blur effect
        //     position: 'absolute',
        //   },
        //   default: {},
        // }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create-listing"
        options={{
          title: "Create Listing",
          tabBarIcon: ({ color }) => (
            <PaperAirplaneIcon size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserCircleIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
