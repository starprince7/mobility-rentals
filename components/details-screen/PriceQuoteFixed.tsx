import { Dimensions, Platform, View } from "react-native";
import { FancyText, NiceButton, StackView } from "../ui";
import { formatToCurrency } from "@/utils";
import { Link } from "expo-router";

export function PriceQuoteFixed({ price }: { price: number }) {
  const { height } = Dimensions.get("screen");

  // Calculate bottom position
  const calculatedAndroidTopHeight = height * 0.8; // Place at 82% of screen height
  const calculatedIosTopHeight = height * 0.77; // Place at 77% of screen height

  return (
    <View
      // style={{
      //   position: "absolute",
      //   top:
      //     Platform.OS === "ios"
      //       ? calculatedIosTopHeight
      //       : calculatedAndroidTopHeight, // Use calculated value here
      //   width: "100%",
      //   height: "100%",
      //   backgroundColor: "white",
      //   paddingBottom: 24, // Equivalent to `pb-6`
      //   paddingHorizontal: 24, // Equivalent to `px-6`
      // }}
      className="bg-white w-full absolute bottom-0 px-6 h-[96px]"
    >
      <StackView
        direction="horizontal"
        className="justify-between items-end w-full pt-4"
      >
        <StackView direction="horizontal" className="gap-1.5">
          <FancyText className="text-3xl font-bold">
            {formatToCurrency(price, "NGN")}
          </FancyText>
          <FancyText className="text-sm text-neutral-500">/ 1 Day</FancyText>
        </StackView>
        <Link asChild href="/(protected)/booking">
          <NiceButton className="w-52">Rent</NiceButton>
        </Link>
      </StackView>
    </View>
  );
}
