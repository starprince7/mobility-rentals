import React from "react";
import { View } from "react-native";
import { FadeInDown } from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FancyText, StackView } from "./ui";
import { useDispatch } from "react-redux";
import {
  setBookingStartDate,
  setBookingEndDate,
} from "@/store/booking-info-slice";

export function DateRangePicker() {
  const dispatch = useDispatch();
  
  const selectFromDate = (event: any, selectedDate: any) => {
    dispatch(setBookingStartDate(selectedDate)); // From Date: 2024-12-24T02:32:07.684Z
  };

  const selectToDate = (event: any, selectedDate: any) => {
    console.log("To Date:", selectedDate);
    dispatch(setBookingEndDate(selectedDate)); // To Date: 2024-12-26T02:39:00.000Z
  };

  return (
    <>
      <View className=" mb-5">
        <StackView
          entering={FadeInDown.delay(380).duration(600).springify().damping(12)}
          direction="horizontal"
          className="mt-4 bg-neutral-200 border border-gray-300 justify-between mx-6 py-3 px-6 rounded-full"
        >
          <StackView direction="vertical" className="flex-1">
            <FancyText className="text-gray-900 text-sm font-medium">
              From Date
            </FancyText>
          </StackView>
          <View className="bg-gray-300 rounded-lg p-0.5 h-8" />
          <DateTimePicker
            mode="datetime"
            display="default"
            value={new Date()}
            minimumDate={new Date()}
            textColor="red"
            onChange={selectFromDate}
          />
        </StackView>
        <StackView
          entering={FadeInDown.delay(200).duration(800).springify().damping(16)}
          direction="horizontal"
          className="mt-4 bg-neutral-200 border border-gray-300 justify-between mx-6 py-3 px-6 rounded-full"
        >
          <StackView direction="vertical" className="flex-1">
            <FancyText className="text-gray-900 text-sm font-medium">
              To Date
            </FancyText>
          </StackView>
          <View className="bg-gray-300 rounded-lg p-0.5 h-8" />
          <DateTimePicker
            mode="datetime"
            display="default"
            value={new Date()}
            minimumDate={new Date()}
            textColor="red"
            onChange={selectToDate}
          />
        </StackView>
      </View>
    </>
  );
}
