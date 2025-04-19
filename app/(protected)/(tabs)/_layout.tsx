import React from "react";
import { Tabs } from "expo-router";
import {
  HomeIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function BottomNavigationTab() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black", // add your color code as you like,
        headerShown: false,
        tabBarStyle: { backgroundColor: "intial", paddingTop: 2 },
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
          tabBarIcon: ({ color }) => <HomeIcon size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color }) => <HeartIcon size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="more-horiz" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
