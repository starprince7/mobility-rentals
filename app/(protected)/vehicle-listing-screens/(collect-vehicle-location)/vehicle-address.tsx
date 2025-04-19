import { ScrollView, SafeAreaView, View } from "react-native";
import React from "react";
import {
  FancyInput,
  FancyText,
  FixedBottomView,
  NiceButton,
} from "@/components/ui";
import { Stack, useRouter } from "expo-router";
import Divider from "@/components/ui/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVehicleOnboardingStore,
  setLocation,
} from "@/store/vehicle-onboarding-data/reducer";
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton";
import { useForm } from "react-hook-form";

interface FormFields {
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  zipCode: string;
}

export default function VehicleAddressScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { control, handleSubmit, watch } = useForm<FormFields>({
    defaultValues: {
      country: "",
      state: "",
      city: "",
      streetAddress: "",
      zipCode: "",
    },
  });
  const vehicleOnboardingStore = useSelector(selectVehicleOnboardingStore);

  const { country, state, city } = vehicleOnboardingStore;

  // Watch the streetAddress field to determine if the button should be enabled
  const streetAddress = watch("streetAddress");
  const cityValue = watch("city");
  const validCityValue = !cityValue || cityValue.trim() === "";
  const validStreetAddress = !streetAddress || streetAddress.trim() === "";
  const isButtonDisabled = validCityValue && validStreetAddress;

  const onSubmit = (data: FormFields) => {
    dispatch(
      setLocation({
        ...vehicleOnboardingStore,
        city: data.city,
        streetAddress: data.streetAddress,
        zipCode: data.zipCode,
      } as any)
    );
    // alert(
    //   JSON.stringify({
    //     ...vehicleOnboardingStore,
    //     city: data.city,
    //     streetAddress: data.streetAddress,
    //     zipCode: data.zipCode,
    //   })
    // );
    router.push("/vehicle-listing-screens/map-view-set-vehicle-location");
  };

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          headerTitle: () => <FancyText className="text-lg">Address</FancyText>,
        }}
      />
      {/* Header Start */}
      <View className="bg-gray-200 mb-3">
        <GoBackButtonFloating
          size={20}
          type="close"
          color="black"
          className="top-3 bg-zinc-100"
        />

        <View className="">
          <FancyText className="text-center py-4 font-bold text-xl">
            Address
          </FancyText>
        </View>
      </View>
      {/* Header End */}
      <ScrollView className="flex-1 px-6 pt-5">
        <FancyText className=" my-2">
          Please enter a specific location.
        </FancyText>
        <Divider />
        {/* Form Start Here! */}
        <FancyInput
          label="country"
          placeholder="country"
          defaultValue={country}
          className="mt-6"
        />
        <FancyInput
          label="State / Region / Province"
          placeholder="State"
          defaultValue={state}
          className="mt-6"
        />
        <FancyInput
          control={control as any}
          name="city"
          label="City"
          placeholder="City"
          className="mt-6"
          defaultValue={city}
        />
        <FancyInput
          control={control as any}
          name="streetAddress"
          label="Street Address"
          placeholder="Enter your street address"
          className="mt-6"
        />
        <FancyInput
          control={control as any}
          name="zipCode"
          label="Zip / Postal code"
          placeholder="Enter your Zip / Postal code"
          className="mt-6"
        />
      </ScrollView>
      <FixedBottomView className="absolute h-[100px] pt-3">
        <NiceButton
          onPress={handleSubmit(onSubmit)}
          disabled={isButtonDisabled}
        >
          Next
        </NiceButton>
      </FixedBottomView>
    </SafeAreaView>
  );
}
