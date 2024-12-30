import React from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { FancyText, StackView } from "./ui";
import { formatToCurrency, getDaysBetweenDates } from "@/utils";
import { selectVehicleDetail } from "@/store/vehicleSlice/reducer";
import { selectBookingInformation } from "@/store/booking-info-slice";
import { setBookingTotalPrice } from "@/store/booking-info-slice/reducer";

const SERVICE_FEE = 10;

export function PriceDetails() {
  const dispatch = useDispatch();
  const { vehicleDetail } = useSelector(selectVehicleDetail);
  const { endDate, startDate } = useSelector(selectBookingInformation);
  const [days, setDays] = React.useState(0);

  const rentalPrice = vehicleDetail?.rentalPricePerDay || 0;

  React.useEffect(() => {
    const { days } = getDaysBetweenDates(startDate, endDate);
    if (days) setDays(days);
  }, [endDate, startDate]);

  React.useEffect(() => {
    const totalPrice = rentalPrice * days + SERVICE_FEE;
    console.log("New price dispatch call. New price is:", totalPrice);
    dispatch(setBookingTotalPrice(totalPrice));
  }, [days, rentalPrice, dispatch]);

  return (
    <View className=" border border-gray-300 rounded-[30px] mx-6 bg-neutral-200 p-6">
      <FancyText className="text-xl font-bold mb-4">Price details</FancyText>
      <StackView direction="vertical" className="justify-between gap-y-5">
        <StackView direction="horizontal" className="justify-between">
          <FancyText className="text-gray-900">
            Base Price x {days} {days > 1 ? "days" : "day"}
          </FancyText>
          <FancyText className="text-gray-900">
            {formatToCurrency(rentalPrice * days, "USD")}
          </FancyText>
        </StackView>
        <StackView direction="horizontal" className="justify-between">
          <FancyText className="text-gray-900">Service fee</FancyText>
          <FancyText className="text-gray-900">
            {formatToCurrency(SERVICE_FEE, "USD")}
          </FancyText>
        </StackView>
        <View className="border-b border-gray-300" />
        <StackView direction="horizontal" className="justify-between">
          <FancyText className="text-gray-900 text-lg">Total(USD)</FancyText>
          <FancyText className="text-gray-900 font-medium text-lg">
            {formatToCurrency(rentalPrice * days + SERVICE_FEE, "USD")}
          </FancyText>
        </StackView>
      </StackView>
    </View>
  );
}
