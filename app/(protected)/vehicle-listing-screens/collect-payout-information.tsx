import React, { useState, useRef } from "react"
import { Stack, useRouter } from "expo-router"
import { View, Text, TextInput, Pressable, Keyboard } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { FancyText, FixedBottomView, NiceButton, StackView } from "@/components/ui"

import {
  selectPayoutInformation,
  setAccountName,
  setAccountNumber,
  setBankName,
  setBvn,
  setRentalPrice,
  submitPayoutData,
} from "@/store/payout-data/reducer"
import { ScrollView } from "react-native-gesture-handler"

export default function CollectPayoutInfoScreen() {
  const router = useRouter()
  const dispatch = useDispatch()
  const payoutInfo = useSelector(selectPayoutInformation)

  // References for text inputs to handle focus
  const bankNameRef = useRef<TextInput>(null)
  const accountNumberRef = useRef<TextInput>(null)
  const accountNameRef = useRef<TextInput>(null)
  const bvnRef = useRef<TextInput>(null)
  const rentalAmountRef = useRef<TextInput>(null)

  // Handle input focus
  const handleInputFocus = (inputRef: React.RefObject<TextInput>) => {
    inputRef.current?.focus()
  }

  // Check if form is complete
  const isFormComplete = React.useMemo(() => {
    return (
      payoutInfo.bankName.trim() !== "" &&
      payoutInfo.accountNumber.length === 10 &&
      payoutInfo.accountName.trim() !== "" &&
      payoutInfo.bvn.length === 11 &&
      payoutInfo.rentalPrice > 0 &&
      Number(payoutInfo.rentalPrice) > 0
    )
  }, [payoutInfo])

  // Handle form submission
  const handleSubmit = () => {
    console.log("Payout Info Submitted:", payoutInfo)
    // Here you would dispatch the payout info to Redux
    dispatch<any>(submitPayoutData(payoutInfo))

    // Navigate to next screen
    router.push(
      "/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_make_model_year",
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <FancyText fontBold className="text-xl">
              Payout Information
            </FancyText>
          ),
        }}
      />
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 px-6 pt-2 pb-14 mb-14">
          <StackView direction="horizontal" className="justify-between py-4 mb-1">
            <FancyText fontBold>9 of 11</FancyText>
            <NiceButton
              variant="text"
              size="small"
              className="bg-zinc-200 !py-2 px-5"
              onPress={() =>
                router.push("/(protected)/vehicle-listing-screens/listing-steps-involved")
              }
            >
              View steps
            </NiceButton>
          </StackView>
          <View className="gap-y-0 pb-24">
            <FancyText className="text-3xl font-bold">Rental Amount & Payout Details</FancyText>
            <Text className="text-zinc-600">
              Add your desired rental price. All payments will be in Nigerian Naira (₦).
            </Text>

            {/* Rental Amount */}
            <Pressable onPress={() => handleInputFocus(rentalAmountRef)}>
              <StackView
                direction="horizontal"
                className="justify-between rounded-2xl border-zinc-200 bg-white px-4 py-[17px]"
              >
                <FancyText className="text-lg">Rental Amount (₦)</FancyText>
                <TextInput
                  ref={rentalAmountRef}
                  placeholder="Set rental amount"
                  className="rounded-md p-2 text-right"
                  value={String(payoutInfo.rentalPrice || "")}
                  onChangeText={(text) => dispatch(setRentalPrice(Number(text)))}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => handleInputFocus(bankNameRef)}
                />
              </StackView>
              {!payoutInfo.rentalPrice && Number(payoutInfo.rentalPrice) <= 0 && (
                <Text className="text-red-500 text-sm text-right mt-1">Enter a valid amount</Text>
              )}
            </Pressable>

            <Text className="text-zinc-600">
              Add your bank account details to receive payments when guests book your vehicle. All
              payments will be in Nigerian Naira (₦).
            </Text>

            {/* Bank Name */}
            <Pressable
              onPress={() => handleInputFocus(bankNameRef)}
              className="bg-zinc-50 rounded-t-lg px-1"
            >
              <StackView
                direction="horizontal"
                className="justify-between border-b border-zinc-300 py-4"
              >
                <FancyText className="text-lg text-zinc-700">Bank Name</FancyText>
                <TextInput
                  ref={bankNameRef}
                  placeholder="Enter bank name"
                  className="rounded-md p-2 text-right"
                  keyboardType="default"
                  value={payoutInfo.bankName}
                  onChangeText={(text) => dispatch(setBankName(text))}
                  returnKeyType="next"
                  onSubmitEditing={() => handleInputFocus(accountNumberRef)}
                />
              </StackView>
              {payoutInfo.bankName.trim() === "" && payoutInfo.bankName.length > 0 && (
                <Text className="text-red-500 text-sm text-right mt-1">
                  Bank name is required
                </Text>
              )}
            </Pressable>

            {/* Account Number Input */}
            <Pressable
              onPress={() => handleInputFocus(accountNumberRef)}
              className="bg-zinc-50 rounded-t-lg px-1"
            >
              <StackView
                direction="horizontal"
                className="justify-between border-b border-zinc-300 py-4"
              >
                <FancyText className="text-lg text-zinc-700">Account Number</FancyText>
                <TextInput
                  ref={accountNumberRef}
                  placeholder="10-digit number"
                  className="rounded-md p-2 text-right"
                  keyboardType="numeric"
                  maxLength={10}
                  value={payoutInfo.accountNumber}
                  onChangeText={(text) => dispatch(setAccountNumber(text))}
                  returnKeyType="next"
                  onSubmitEditing={() => handleInputFocus(accountNameRef)}
                />
              </StackView>
              {payoutInfo.accountNumber.length > 0 && payoutInfo.accountNumber.length !== 10 && (
                <Text className="text-red-500 text-sm text-right mt-1">Must be 10 digits</Text>
              )}
            </Pressable>

            {/* Account Name Input */}
            <Pressable onPress={() => handleInputFocus(accountNameRef)}>
              <StackView
                direction="horizontal"
                className="justify-between border-b border-zinc-300 py-4"
              >
                <FancyText className="text-lg">Account Name</FancyText>
                <TextInput
                  ref={accountNameRef}
                  placeholder="Account holder name"
                  className="rounded-md p-2 text-right"
                  value={payoutInfo.accountName}
                  onChangeText={(text) => dispatch(setAccountName(text))}
                  returnKeyType="next"
                  onSubmitEditing={() => handleInputFocus(bvnRef)}
                />
              </StackView>
            </Pressable>

            {/* BVN Input */}
            <Pressable onPress={() => handleInputFocus(bvnRef)}>
              <StackView
                direction="horizontal"
                className="justify-between border-b border-zinc-300 py-4"
              >
                <FancyText className="text-lg">BVN</FancyText>
                <TextInput
                  ref={bvnRef}
                  placeholder="11-digit BVN"
                  className="rounded-md p-2 text-right"
                  keyboardType="numeric"
                  maxLength={11}
                  value={payoutInfo.bvn}
                  onChangeText={(text) => dispatch(setBvn(text))}
                  returnKeyType="done"
                />
              </StackView>
              {payoutInfo.bvn.length > 0 && payoutInfo.bvn.length !== 11 && (
                <Text className="text-red-500 text-sm text-right mt-1">Must be 11 digits</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
        <FixedBottomView className="h-[97px]">
          <NiceButton onPress={handleSubmit} disabled={!isFormComplete}>
            Save and continue
          </NiceButton>
        </FixedBottomView>
      </Pressable>
    </>
  )
}
