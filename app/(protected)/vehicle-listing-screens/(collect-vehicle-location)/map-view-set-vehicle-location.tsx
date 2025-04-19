import { ScrollView, SafeAreaView, View, StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { FancyText, FixedBottomView, NiceButton } from "@/components/ui";
import { Stack, useRouter } from "expo-router";
import Divider from "@/components/ui/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVehicleOnboardingStore,
  setLocation,
  validateVehicleLocation,
} from "@/store/vehicle-onboarding-data/reducer";
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton";

export default function MapViewSetVehicleLocation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const vehicleOnboardingStore = useSelector(selectVehicleOnboardingStore);

  const { countryCode, country, state, city, latitude, longitude } =
    vehicleOnboardingStore;

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText className="text-lg">Car Location</FancyText>
          ),
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
            Car Location
          </FancyText>
        </View>
      </View>
      {/* Header End */}
      <View className="flex-1">
        <View className="px-6 mt-2">
          <FancyText fontBold className="text-center text-zinc-900 uppercase">
            {state}, {countryCode}
          </FancyText>
          <Divider />
          <FancyText className="my-4 text-sm text-center text-zinc-600">
            Guests will pick up your car here!{" "}
            <FancyText fontBold>Tap on the pin and Drag pin to select a location</FancyText>.
          </FancyText>
        </View>
        {/* Render a map view-start here! */}
        <View style={{ width: "100%" }} className="h-[535px]">
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude,
              longitude,
              // longitudeDelta: 0.0421, // City-level View
              // latitudeDelta: 0.0922, // City-level View
              latitudeDelta: 0.005, // Neighborhood View
              longitudeDelta: 0.005, // Neighborhood View
            }}
          >
            <Marker
              draggable
              image={require("../../../../assets/images/map/add-location-pin.png")}
              style={{ width: 80, height: 80 }}
              coordinate={{ latitude, longitude }}
              title="Car location"
              onDragEnd={(e) => {
                dispatch(
                  setLocation({
                    ...vehicleOnboardingStore,
                    longitude: e.nativeEvent.coordinate.longitude,
                    latitude: e.nativeEvent.coordinate.latitude,
                  })
                );
              }}
            />
          </MapView>
        </View>
        {/* Render a map view-end here! */}
      </View>
      <FixedBottomView className="absolute h-[100px] pt-3">
        <NiceButton
          onPress={() => {
            dispatch(
              validateVehicleLocation({
                city,
                country,
                latitude,
                longitude,
              }) as any
            );
            router.back()
            router.back()
            router.back()
          }}
        >
          Confirm Location
        </NiceButton>
      </FixedBottomView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
