import { View, ScrollView } from "react-native";
import React from "react";
import {
  Header,
  SearchBarInput,
  TopBrands,
  VehicleListings,
} from "@/components";

export default function index() {
  return (
    <ScrollView className="flex-1">
      <View className="bg-black pt-20 h-80">
        <Header />
        <SearchBarInput />
        <TopBrands />
      </View>
      <VehicleListings />
    </ScrollView>
  );
}
