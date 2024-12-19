import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { HomeIcon, UserCircleIcon, PaperAirplaneIcon } from 'react-native-heroicons/solid'
import { Icon } from '@/components/ui';

export default function BottomNavigationTab() {
    return (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#000000', // add your color code as you like,
            headerShown: false,
            // tabBarButton: HapticTab,
            // tabBarBackground: TabBarBackground,
            // tabBarStyle: Platform.select({
            //   ios: {
            //     // Use a transparent background on iOS to show the blur effect
            //     position: 'absolute',
            //   },
            //   default: {},
            // }),
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <HomeIcon size={28} />,
            }}
          />
          <Tabs.Screen
            name="create-listing"
            options={{
              title: 'Create Listing',
              tabBarIcon: ({ color }) => <PaperAirplaneIcon size={28} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <UserCircleIcon size={28} />,
            }}
          />
        </Tabs>
      );
}