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
      <FancyText className="text-white text-sm ml-6">Top Brands</FancyText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-6 pl-6 mt-1"
      >
        {images.map((source, i) => (
          <Avatar size="large" localSource={source} key={i} />
        ))}
      </ScrollView>
      <View className="flex-row absolute w-full top-7 justify-between pointer-events-none">
        <LinearGradient
          colors={["black", "transparent"]}
          start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 0 }}
          // className="w-6 h-14 min-h-10"
          style={styles.leftGradient}
        />

        <LinearGradient
          colors={["transparent", "black"]}
          // start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rightGradient}
        />
      </View>
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
