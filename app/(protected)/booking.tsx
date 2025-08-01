import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { FancyText } from "@/components/ui";
import {
  VehicleSummary,
  DateRangePicker,
  PriceDetails,
  PayWithStripeButton as ButtonPayWithStripe,
} from "@/components";
import {
  eraseBookingInformationState,
  selectBookingInformation,
} from "@/store/booking-data";
import { PaymentSheetError, StripeError } from "@stripe/stripe-react-native";
import CloseFloatingButton from "@/components/ui/CloseFloatingButton";

export default function BookingScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { endDate, numberOfDays, startDate, totalPrice } = useSelector(
    selectBookingInformation
  );
  const handlePaymentSuccess = async () => {
    // create booking and inform the user of their successful booking creation
    // 1. POST booking information
    // const { data } = await createBooking();
    // 2. Clear state holding booking details
    dispatch(eraseBookingInformationState());
    // 3. navigate a to a booking success screen
    router.push("/(protected)/booking-success");
  };
  const handlePaymentFailure = (
    error: StripeError<PaymentSheetError> | undefined
  ) => {
    // Move to a different screen or show an alert to the user
    alert(`Payment failed. for some random reason. Reason: ${error?.message}`);
  };

  return (
    <View className="flex-1">
      <View className="border border-neutral-200 p-3 items-center">
        <View className="bg-neutral-300 w-12 mb-5 rounded-full p-1" />
        <FancyText fontBold className="text-gray-900 text-xl mb-3 ">
          Request Booking
        </FancyText>
        <CloseFloatingButton color="gray" className="right-6 top-11" size={21}/>
      </View>
      <VehicleSummary />
      <View className="border-b border-neutral-200 my-2 mx-6" />
      <DateRangePicker />
      <PriceDetails />
      <View className="mx-6 mt-auto mb-7">
        <ButtonPayWithStripe
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
        />
      </View>
    </View>
  );
}
