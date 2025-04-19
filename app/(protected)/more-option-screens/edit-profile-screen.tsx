import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton";
import { FancyText, NiceButton, StackView } from "@/components/ui";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Divider from "@/components/ui/Divider";
import { ScrollView } from "react-native";
import DoneFloatingButton from "@/components/ui/DoneFloatingButton";
import { sleep } from "@/utils";

export default function EditProfileScreen() {
  const [loading, setLoading] = React.useState(false);
  return (
    <KeyboardAvoidingView>
      {/* Header Start */}
      <View className="bg-gray-200 mb-3">
        <GoBackButtonFloating
          size={20}
          type="close"
          color="black"
          className="top-3 shadow-sm"
        />
        <DoneFloatingButton
          isLoading={loading}
          size={20}
          color="black"
          className="right-6 shadow-sm top-3"
          onPress={async () => {
            setLoading(true);
            await sleep(3000);
            setLoading(false);
            Alert.alert("Saved!", "Your profile has been updated");
          }}
        />
        <View className="">
          <FancyText className="text-center py-4 font-bold text-xl">
            Owner name
          </FancyText>
        </View>
      </View>
      {/* Header End */}

      <ScrollView className="px-6" contentContainerClassName="pb-[430px]">
        <TouchableOpacity>
          <StackView
            direction="horizontal"
            className="gap-3 items-basline justify-between"
          >
            <FancyText className="text-lg self-center">Change photo</FancyText>
            <View className="">
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </StackView>
        </TouchableOpacity>
        <Divider />
        <FancyText className="mt-4 text-zinc-700 text-sm">
          Please add a profile photo that clearly shows your face. It'll help
          host and guests recognize you at the beginning of a trip.
        </FancyText>

        <FancyText className="mt-6 mb-1 uppercase text-sm text-zinc-700">
          about
        </FancyText>
        <TextInput
          className="border h-32 rounded p-2.5"
          // value={text}
          // onChangeText={setText}
          placeholder="Type something about yourself..."
          multiline={true} // Enables multiple lines
          numberOfLines={4} // Defines initial height (optional)
          textAlignVertical="top" // Aligns text to the top
        />
        <FancyText className="mt-4 text-zinc-700 text-sm">
          Tell host and guest about yourself and why your're a responsible,
          trustworthy person. Share your favourite travel experiences, your
          hobbies, your dream car, or your driving experience. Feel free to
          include links to your LinkedIn, X(formerly Twitter), or Facebook
          profiles so they get to know yoou even better.
        </FancyText>

        <Divider className="mt-14" />
        <StackView direction="horizontal" className="gap-4 mt-4">
          <FancyText>Lives at:</FancyText>
          <TextInput
            placeholder="Type where you live..."
            className="text-right ml-auto text-lg"
          />
        </StackView>
        <Divider className="" />
        <StackView direction="horizontal" className="gap-4 mt-4">
          <FancyText>Works:</FancyText>
          <TextInput
            placeholder="Type where you work..."
            className="text-right ml-auto text-lg"
          />
        </StackView>
        <Divider className="" />
        <StackView direction="horizontal" className="gap-4 mt-4">
          <FancyText>School:</FancyText>
          <TextInput
            placeholder="Type where you attend school..."
            className="text-right ml-auto text-lg"
          />
        </StackView>
        <Divider className="" />
        <StackView direction="horizontal" className="gap-4 mt-4">
          <FancyText>Languages:</FancyText>
          <TextInput
            placeholder="Type language you speak..."
            className="text-right ml-auto text-lg"
          />
        </StackView>
        <Divider className="" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
