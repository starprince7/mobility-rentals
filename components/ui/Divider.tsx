import { View, Text } from "react-native";
import React from "react";

interface Props {
  className?: string;
}

export default function Divider(props: Props) {
  return (
    <View
      className={`${props.className} divider border-zinc-200 mt-4 w-full border`}
    />
  );
}
