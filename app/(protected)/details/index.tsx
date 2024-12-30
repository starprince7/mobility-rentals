import React, { useEffect } from "react";
import { View, ScrollView, Pressable, ActivityIndicator } from "react-native";
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
    <>
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
    </>
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

function LoveButton() {
  const [isLoved, setIsLoved] = React.useState(false);

  const handleLike = () => {
    setIsLoved((prev) => !prev);
  };

  if (!isLoved)
    return (
      <Pressable onPress={handleLike}>
        <HeartIconOutline color="black" />
      </Pressable>
    );
  if (isLoved)
    return (
      <Pressable onPress={handleLike}>
        <HeartIcon color="black" />
      </Pressable>
    );
}

function Description({ content }: { content: string }) {
  return (
    <View className="mx-6">
      <FancyText className="font-semibold mb-3 text-neutral-500">
        Description
      </FancyText>
      <View className="px-6 border border-neutral-300 bg-neutral-200 py-6 mb-2 mt-1 rounded-3xl">
        <ScrollView className="h-80">
          <FancyText className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
            maiores, optio exercitationem officia, quam cum doloribus aliquid,
            perspiciatis debitis illum placeat tempore asperiores!
            Necessitatibus est eligendi vitae, recusandae expedita
            exercitationem. Similique hic commodi deleniti quod placeat
            blanditiis magni maiores aliquam reiciendis quos recusandae, atque
            earum!
          </FancyText>
        </ScrollView>
      </View>
    </View>
  );
}

function PriceQuoteFixed({ price }: { price: number }) {
  return (
    <StackView
      direction="horizontal"
      className="pb-16 absolute w-full bottom-12 bg-white justify-between items-baseline px-6"
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
  );
}
