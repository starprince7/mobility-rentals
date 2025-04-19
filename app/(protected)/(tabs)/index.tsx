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
    <ScrollView className="flex-1 bg-white">
      <View className=" pt-[68px] h-72">
        {/* <Header /> */}
        <SearchBarInput />
        <TopBrands />
      </View>
      <VehicleListings />
    </ScrollView>
  );
}
