import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(protected)/(tabs)" />;
  // return <Redirect href="/(protected)/booking-success" />;
}
