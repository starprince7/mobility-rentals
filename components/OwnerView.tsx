import { View } from "react-native";
import React from "react";
import { Avatar, FancyText, NiceButton, StackView } from "./ui";
import { LocationIndicator } from "./LocationIndicator";
import { IVehicle } from "@/types";

const localSource = require("@/assets/images/avatar-portrait.jpg");

interface Props {
  profileImage?: string;
  ownerName: string;
  contact?: string;
  location: IVehicle["location"] | undefined;
}

export function OwnerView({ ownerName, location, profileImage }: Props) {
  return (
    <View className="mx-6 bg-neutral-200 border border-neutral-300 pt-5 mt-10 mb-2 rounded-3xl">
      <StackView direction="horizontal" className="gap-3 px-6 mb-9">
        <Avatar
          size="large"
          localSource={profileImage || localSource}
          uri={profileImage || ""}
        />
        <StackView direction="vertical">
          <FancyText className="font-semibold text-lg mb-1">
            {ownerName || 'Vehicle Owner'}
          </FancyText>
          {location?.city && location?.country && (
            <LocationIndicator
              className="text-neutral-400 font-normal text-xs"
              iconColor="#a3a3a3"
              iconSize={13}
              value={[location.city, location.country]}
            />
          )}
        </StackView>
      </StackView>
      <NiceButton size="small" className="text-sm">
        Contact Owner
      </NiceButton>
    </View>
  );
}
