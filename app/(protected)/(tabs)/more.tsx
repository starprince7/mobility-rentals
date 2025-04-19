import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { ComponentProps } from "react";
import { Avatar, FancyText, NiceButton, StackView } from "@/components/ui";
import { Link } from "expo-router";
import { UserIcon } from "react-native-heroicons/solid";

// Icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

const localSource = require("@/assets/images/avatar-portrait.jpg");

export default function MoreOptionsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 gap-10 mx-6 mt-6 android:mt-16">
        <Link href="/(protected)/more-option-screens/account-screen">
          <StackView
            direction="horizontal"
            className="gap-4 border-b w-full pb-4 border-zinc-300"
          >
            <View className="bg-zinc-300 rounded-full p-1.5">
              <UserIcon size={30} color="#737373" />
            </View>
            <StackView direction="vertical" className="gap-1">
              <FancyText className="text-xl font-bold">Jane Doe</FancyText>
              <FancyText className="text-blue-500 font-bold">
                View and edit profile
              </FancyText>
            </StackView>
          </StackView>
        </Link>

        <View className="border-zinc-300 rounded-3xl border py-5 px-4 gap-y-5">
          <FancyText className="text-lg">Become a host</FancyText>
          <FancyText className="text-zinc-600">
            Join thousands of hosts building businesses and earning meaningful
            income on Lapp.
          </FancyText>
          <NiceButton
            href="/more-option-screens/intro-become-a-host-screen"
            size="small"
            variant="outline"
            className=""
          >
            Learn more
          </NiceButton>
        </View>

        <StackView direction="vertical" className="gap-10 justify-between">
          <ListItem
            href="/(protected)/more-option-screens/account-screen"
            title="Account"
            icon={<UserIcon size={25} color="black" />}
          />
          <ListItem
            href="/(protected)/more-option-screens/account-screen"
            title="Gifts cards"
            icon={
              <MaterialCommunityIcons
                name="wallet-giftcard"
                size={24}
                color="black"
              />
            }
          />
          <ListItem
            href="/(protected)/more-option-screens/account-screen"
            title="How Drop Ride works"
            icon={
              <MaterialCommunityIcons name="car-key" size={24} color="black" />
            }
          />
          <ListItem
            href="/(protected)/more-option-screens/account-screen"
            title="Legal"
            icon={<Entypo name="text-document" size={24} color="black" />}
          />

        </StackView>
      </View>
      <View className="flex-1 shadow-lg px-6 rounded-2xl">
        <NiceButton size="small" className="mt-auto mb-6">Log out</NiceButton>
      </View>
    </SafeAreaView>
  );
}

interface PropsListItem {
  title: string;
  icon: React.ReactNode;
  href: ComponentProps<typeof Link>["href"];
}
function ListItem(props: PropsListItem) {
  return (
    <Link href={props.href} asChild>
      <TouchableOpacity>
        <StackView direction="horizontal" className="gap-3 items-basline">
          <View className="">{props.icon}</View>
          <FancyText className="text-lg self-center">{props.title}</FancyText>
        </StackView>
      </TouchableOpacity>
    </Link>
  );
}
