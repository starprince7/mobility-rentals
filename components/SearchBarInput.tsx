import React from "react";
import { View, Text, TextInput } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

export function SearchBarInput() {
  return (
    <View className="w-full px-6 mt-4 mb-1">
      <View className="flex-row gap-2 items-center border border-neutral-300 pl-3 py-3 rounded-xl">
        <MagnifyingGlassIcon size={25} color="#737373" />
        <TextInput
          placeholder="Search for cars, brands, models..."
          className="flex-1 text-black py-1 px-2 placeholder:text-neutral-500"
        />
      </View>
    </View>
  );
}
