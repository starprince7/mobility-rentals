import { FancyText, NiceButton } from "@/components/ui";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";

const BookingSuccess: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <FancyText className="text-3xl font-bold">Booking Successful!</FancyText>
      <FancyText className="text-lg">
        Your booking has been confirmed.
      </FancyText>
      {/* Add more content or components as needed */}
      <Link asChild href="/(protected)/(tabs)">
        <NiceButton className="mt-6">Return to Home</NiceButton>
      </Link>
    </SafeAreaView>
  );
};

export default BookingSuccess;
