import { Redirect } from "expo-router"

export default function Index() {
  return <Redirect href="/(protected)/(tabs)" />
  // return (
  //   <Redirect href="/(protected)/vehicle-listing-screens/collect-vehicle-photos" />
  // )
  // return (
  //   <Redirect href="/(protected)/vehicle-listing-screens/collect-payout-information" />
  // )
  // return (
  //   <Redirect href="/(protected)/vehicle-listing-screens/submit-your-listing" />
  // )
  // return (
  //   <Redirect href="/(protected)/vehicle-listing-screens/collect-drivers-license" />
  // )
  // return <Redirect href="/(protected)/(verification)/send-email-verification" />;
  // return <Redirect href="/(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect-license-plate" />
  // return (
  //   <Redirect href="/(protected)/vehicle-listing-screens/(collect-personal-info)/collect_profile_information" />
  // )
}
