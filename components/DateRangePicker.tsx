import React, { useState } from "react";
import { View, Platform, Pressable } from "react-native";
import { FadeInDown } from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { FancyText, StackView } from "./ui";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookingStartDate,
  setBookingEndDate,
  selectBookingInformation,
} from "@/store/booking-info-slice";

export function DateRangePicker() {
  const isAndroid = Platform.OS === "android";
  const dispatch = useDispatch();
  const { endDate, startDate } = useSelector(selectBookingInformation);

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const selectFromDate = (event: any, selectedDate: any) => {
    setShowStartPicker(false);

    if (event.type === "set" && selectedDate) {
      dispatch(setBookingStartDate(selectedDate));
    }
  };

  const selectToDate = (event: any, selectedDate: any) => {
    setShowEndPicker(false);

    if (event.type === "set" && selectedDate) {
      dispatch(setBookingEndDate(selectedDate));
    }
  };

  // New Update

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const setStartDate = (date: any) => {
    console.warn("A start date has been picked: ", date);
    dispatch(setBookingEndDate(date));
    hideStartDatePicker();
  };

  const setEndDate = (date: any) => {
    console.warn("An end date has been picked: ", date);
    dispatch(setBookingEndDate(date));
    hideEndDatePicker();
  };

  return (
    <View className="mb-5">
      <StackView
        entering={FadeInDown.delay(380).duration(600).springify().damping(12)}
        direction="horizontal"
        className="mt-4 bg-neutral-200 border border-gray-300 justify-between mx-6 py-3 px-6 rounded-full"
      >
        <Pressable
          onPress={showStartDatePicker}
          className="flex-1"
        >
          <StackView direction="vertical">
            <FancyText className="text-gray-900 text-sm font-medium">
              From Date
            </FancyText>
            {isAndroid && (
              <FancyText className="text-gray-600">
                {startDate.toLocaleDateString()}
              </FancyText>
            )}
          </StackView>
        </Pressable>

        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="datetime"
          onConfirm={setStartDate}
          onCancel={hideStartDatePicker}
        />
      </StackView>

      <StackView
        entering={FadeInDown.delay(200).duration(800).springify().damping(16)}
        direction="horizontal"
        className="mt-4 bg-neutral-200 border border-gray-300 justify-between mx-6 py-3 px-6 rounded-full"
      >
        <Pressable onPress={showEndDatePicker} className="flex-1">
          <StackView direction="vertical">
            <FancyText className="text-gray-900 text-sm font-medium">
              To Date
            </FancyText>
            {isAndroid && (
              <FancyText className="text-gray-600">
                {endDate.toLocaleDateString()}
              </FancyText>
            )}
          </StackView>
        </Pressable>

        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="datetime"
          onConfirm={setEndDate}
          onCancel={hideEndDatePicker}
        />
      </StackView>
    </View>
  );
}
