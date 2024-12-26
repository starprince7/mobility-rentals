import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, FancyText } from "./ui";

const bmwImage = require("@/assets/images/car-brands/bmw-logo.png");
const toyotaLogo = require("@/assets/images/car-brands/toyota-logo.png");
const mercedesLogo = require("@/assets/images/car-brands/mercedes-logo.png");
const lexusImage = require("@/assets/images/car-brands/lexus-logo.png");

const images = [
  bmwImage,
  toyotaLogo,
  mercedesLogo,
  lexusImage,
  bmwImage,
  toyotaLogo,
  mercedesLogo,
  lexusImage,
];

export function TopBrands() {
  return (
    <View className="mt-3 gap-3 relative">
      <FancyText className="text-black text-sm ml-6">Top Brands</FancyText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-6 pl-6 mt-1"
      >
        {images.map((source, i) => (
          <Avatar size="large" localSource={source} key={i} />
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  leftGradient: {
    flex: 1,
    height: 60,
  },
  rightGradient: {
    flex: 1,
    height: 60,
  },
});
