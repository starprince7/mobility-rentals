import React from "react"
import { Tabs } from "expo-router"
import {
  HomeIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "react-native-heroicons/solid"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { View } from "react-native"
import { FancyText, StackView } from "@/components/ui"

const RenderTabIcon = ({
  color,
  iconName,
  title,
  focused,
}: {
  color: string
  title: string
  iconName: React.ComponentProps<typeof MaterialIcons>["name"]
  focused: boolean
}) => {
  return (
    <StackView direction="vertical" className="gap-0 w-20 mt-2 justify-center items-center">
      <MaterialIcons name={iconName} size={30} color={color} />
      <FancyText fontBold className={`text-sm ${focused ? "text-zinc-800" : "text-zinc-500"}`}>
        {title}
      </FancyText>
    </StackView>
  )
}

export default function BottomNavigationTab() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#23666B", // add your color code as you like,
        headerShown: false,
        tabBarStyle: { backgroundColor: "white", paddingTop: 2 },
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
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <RenderTabIcon focused={focused} color={color} iconName="home-filled" title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <RenderTabIcon
              focused={focused}
              color={color}
              iconName="favorite"
              title="Favourites"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <RenderTabIcon focused={focused} color={color} iconName="more-horiz" title="More" />
          ),
        }}
      />
    </Tabs>
  )
}
