import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  FancyText,
  NiceButton,
  NiceImageCarousel,
  StackView,
} from "@/components/ui";
import { OwnerView, VehicleSpecs } from "@/components";
import { HeartIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartIconOutline } from "react-native-heroicons/outline";
import { Link, useLocalSearchParams } from "expo-router";
import { formatToCurrency } from "@/utils";
import { IAvailableVehicles } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIntoStoreVehicleDetail,
  selectVehicleDetail,
} from "@/store/vehicleSlice/reducer";

export default function VehicleDetailScreen() {
  const { networkRequestStatus, vehicleDetail } =
    useSelector(selectVehicleDetail);
  const dataFromVehicleCard = useLocalSearchParams();
  const { id, images } = dataFromVehicleCard as unknown as IAvailableVehicles;

  // Fetch vehicle detail
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIntoStoreVehicleDetail({ id }) as any);
  }, []);

  // alert(vehicleDetail?.images[0]);
  // console.log({ owner: vehicleDetail });

  if (networkRequestStatus === "loading")
    return (
      <StackView direction="horizontal" className="justify-center flex-1">
        <ActivityIndicator size="large" />
      </StackView>
    );

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="light" />
      <ScrollView contentContainerClassName="pb-60" className="flex-1">
        <NiceImageCarousel
          images={vehicleDetail?.images}
          className="w-full h-72"
          carouselHeight={250}
        />
        <VehicleModelName
          make={vehicleDetail?.make as string}
          model={vehicleDetail?.model as string}
          year={vehicleDetail?.year as number}
        />
        <VehicleSpecs features={vehicleDetail?.features} />
        {vehicleDetail?.description && (
          <Description content={vehicleDetail?.description} />
        )}
        <OwnerView
          location={vehicleDetail?.location as string}
          ownerName={vehicleDetail?.owner.name as string}
        />
      </ScrollView>
      <PriceQuoteFixed price={vehicleDetail?.rentalPricePerDay as number} />
    </SafeAreaView>
  );
}

function VehicleModelName({
  make,
  model,
  year,
}: {
  make: string;
  model: string;
  year: string | number;
}) {
  return (
    <View className="mx-6 my-6">
      <FancyText
        className="font-bold text-2xl"
        endIcon={<LoveButton />}
        justifyContent="space-between"
      >
        {make} {model} {year}
      </FancyText>
    </View>
  );
}

const LoveButton = React.memo(() => {
  const [isLoved, setIsLoved] = React.useState(false);

  const handleLike = React.useCallback(() => {
    setIsLoved((prev) => !prev);
  }, []);

  if (!isLoved)
    return (
      <Pressable onPress={handleLike}>
        <HeartIconOutline color="black" />
      </Pressable>
    );
  return (
    <Pressable onPress={handleLike}>
      <HeartIcon color="black" />
    </Pressable>
  );
});

function Description({ content }: { content: string }) {
  return (
    <View className="mx-6">
      <FancyText className="font-semibold mb-3 text-neutral-500">
        Description
      </FancyText>
      <View className="px-6 border border-neutral-300 bg-neutral-200 py-6 mb-2 mt-1 rounded-3xl">
        <View className="max-h-80">
          <FancyText className="">{content}</FancyText>
        </View>
      </View>
    </View>
  );
}

function PriceQuoteFixed({ price }: { price: number }) {
  const { height } = Dimensions.get("screen");

  // Dynamically calculate bottom position
  const calculatedAndroidTopHeight = height * 0.8; // Place at 82% of screen height
  const calculatedIosTopHeight = height * 0.77; // Place at 77% of screen height

  return (
    <View
      style={{
        position: "absolute",
        top:
          Platform.OS === "ios"
            ? calculatedIosTopHeight
            : calculatedAndroidTopHeight, // Use calculated value here
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        paddingBottom: 24, // Equivalent to `pb-6`
        paddingHorizontal: 24, // Equivalent to `px-6`
      }}
    >
      <StackView
        direction="horizontal"
        className="justify-between items-baseline w-full"
      >
        <StackView direction="horizontal" className="gap-1.5">
          <FancyText className="text-3xl font-bold">
            {formatToCurrency(price, "USD")}
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
