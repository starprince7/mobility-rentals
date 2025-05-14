import { View } from "react-native"
import React from "react"
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton"
import { FancyText, StackView } from "@/components/ui"
// Icons
import Octicons from "@expo/vector-icons/Octicons"
import { useSelector } from "react-redux"
// redux-selectors
import { selectVehicleOnboardingStore } from "@/store/vehicle-onboarding-data/reducer"
import { selectVerificationCodes } from "@/store/verification-codes/reducer"
import { selectProfileImageStore } from "@/store/profile-photo/reducer"
import { selectDriversLicense } from "@/store/drivers-license/reducer"
import { selectHost } from "@/store/host/reducer"
import { checkVehicleDetailsComplete } from "@/utils"
import { selectPayoutInformation } from "@/store/payout-data/reducer"
import { selectSafetyStandards } from "@/store/accept-safety-standard/reducer"

export default function ListingStepsInvolved() {
  // To track completed step
  // You have to subscribe to the redux store,
  // and check the completed property.
  const { isComplete: mobileNumberComplete } = useSelector(selectVerificationCodes)
  const { isComplete: profilePhotoComplete } = useSelector(selectProfileImageStore)
  const { isComplete: driversLicenseComplete } = useSelector(selectDriversLicense)
  const { isComplete: goalsComplete } = useSelector(selectHost)
  const { isComplete: payoutComplete } = useSelector(selectPayoutInformation)
  const { isComplete: safetyStandardsComplete } = useSelector(selectSafetyStandards)
  const {
    isComplete: vehicleOnboardingComplete,
    vehicleAvailabilty,
    vehicleIdentificationNumber,
    vehicleStatus,
    milesPerGallon,
    vehicleCondition,
    vehicleColor,
    vehicleType,
    seatingCapacity,
    mileage,
    fuelType,
    transmission,
    vehiclePhotosUploaded,
  } = useSelector(selectVehicleOnboardingStore)

  // Using the validation function without useMemo for more reliable updates
  const isVehicleDetailsComplete = checkVehicleDetailsComplete({
    mileage,
    vehicleColor,
    milesPerGallon,
    vehicleIdentificationNumber,
    vehicleStatus,
    vehicleCondition,
    vehicleType,
    seatingCapacity,
    fuelType,
    transmission,
  })

  // For debugging purposes - uncomment to see validation results
  // React.useEffect(() => {
  //   console.log("Vehicle details validation result:", isVehicleDetailsComplete);
  //   console.log("Vehicle details data:", {
  //     mileage,
  //     vehicleColor,
  //     milesPerGallon,
  //     vehicleIdentificationNumber,
  //     vehicleStatus,
  //     vehicleCondition,
  //     vehicleType,
  //     seatingCapacity,
  //     fuelType,
  //     transmission
  //   });
  // }, [
  //   mileage,
  //   vehicleColor,
  //   milesPerGallon,
  //   vehicleIdentificationNumber,
  //   vehicleStatus,
  //   vehicleCondition,
  //   vehicleType,
  //   seatingCapacity,
  //   fuelType,
  //   transmission
  // ]);

  const steps = [
    { name: "Your car", isCompleted: vehicleOnboardingComplete },
    { name: "Profile photo", isCompleted: profilePhotoComplete },
    { name: "Mobile number", isCompleted: mobileNumberComplete },
    { name: "Driver's license", isCompleted: driversLicenseComplete },
    { name: "Your goals", isCompleted: goalsComplete },
    {
      name: "Car availablity",
      isCompleted: vehicleAvailabilty ? vehicleAvailabilty?.length > 0 : false,
    },
    { name: "Car details", isCompleted: isVehicleDetailsComplete },
    { name: "Car photos", isCompleted: vehiclePhotosUploaded },
    { name: "Payout", isCompleted: payoutComplete },
    { name: "Safety & quality standards", isCompleted: safetyStandardsComplete },
    // { name: "Submit your listing", isCompleted: listingSubmitted },
  ]

  return (
    <>
      {/* Header Start */}
      <View className="bg-zinc-200 mb-3">
        <GoBackButtonFloating
          size={20}
          type="close"
          color="#52525b"
          className="top-3 bg-zinc-100"
        />
        <View className="">
          <FancyText className="text-center py-4 font-bold text-xl">
            List your car
          </FancyText>
        </View>
      </View>
      {/* Header End */}
      <View className="flex-1 px-6">
        <StackView direction="vertical" className="gap-4 mt-4">
          {steps.map((step, i) => (
            <FancyText
              key={i}
              className="text-lg text-zinc-700"
              startIcon={
                <Octicons
                  name="check-circle-fill"
                  size={24}
                  // color="#d4d4d8"
                  // color="#22c55e"
                  color={step.isCompleted ? "#22c55e" : "#d4d4d8"}
                />
              }
            >
              {i + 1} {step.name}
            </FancyText>
          ))}
        </StackView>
      </View>
    </>
  )
}
