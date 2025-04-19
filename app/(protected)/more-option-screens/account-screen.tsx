import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Avatar, FancyText, NiceButton, StackView } from "@/components/ui";
import { ScrollView } from "react-native-gesture-handler";

// Icon
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton";
import EditProfileButton from "@/components/ui/EditProfile-Button";
import Divider from "@/components/ui/Divider";

const localSource = require("@/assets/images/avatar-portrait.jpg");

export default function profileScreen() {
  return (
    <SafeAreaView className="flex-1">
      <GoBackButtonFloating color="black" />
      <EditProfileButton color="black" />
      <ScrollView>
        <View className="flex-1 gap-10 mx-6 mt-6 android:mt-16">
          <StackView direction="vertical" className="gap-5 items-center">
            <Avatar size="larger" localSource={localSource} />
            <StackView direction="vertical" className="gap-2 w-full">
              <FancyText className=" text-center px-3 py-1.5 bg-zinc-200 w-48 mb-3 mx-auto rounded-md ">
                Joined Mar 2022
              </FancyText>
              <FancyText className="text-3xl text-center font-bold">
                Jane Doe
              </FancyText>
              <StackView
                direction="horizontal"
                className="gap-3 justify-between mt-3"
              >
                <StackView direction="vertical" className="gap-2 items-center">
                  <FancyText className="text-base text-neutral-500">
                    Active Earnings
                  </FancyText>
                  <FancyText className="text-xl">$100.00</FancyText>
                </StackView>
                <StackView direction="vertical" className="gap-2 items-center">
                  <FancyText className="text-base text-neutral-500">
                    Listings
                  </FancyText>
                  <FancyText className="text-xl">30</FancyText>
                </StackView>
              </StackView>
            </StackView>
          </StackView>
          <StackView direction="vertical" className="gap-5 justify-between">
            <StackView direction="vertical" className="gap-2">
              <FancyText className="text-base text-neutral-500">
                Contact detail
              </FancyText>
              <FancyText className="text-xl">+44 234 567 89</FancyText>
            </StackView>
            <Divider />
            <FancyText className="uppercase tracking-wide text-sm">
              Verified Info
            </FancyText>
            <Divider className="-mt-1" />
            <StackView direction="horizontal" className="gap-3 justify-between">
              <FancyText className="text-xl">johndoe@gmail.com</FancyText>
              <MaterialIcons name="verified" size={20} color="#16a34a" />
            </StackView>
          </StackView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
