import { Text, View } from "react-native";
import { FancyText } from "../ui";

export function Description({ content }: { content: string }) {
  return (
    <View className="mx-6 my-5">
      <FancyText className="uppercase text-zinc-500 font-bold mb-2 tracking-wide text-sm">Description</FancyText>
      <View className="px-6 border border-neutral-300 bg-neutral-200 py-6 mb-2 mt-1 rounded-3xl">
        <View className="max-h-80">
          <FancyText className="">{content}</FancyText>
        </View>
      </View>
    </View>
  );
}
