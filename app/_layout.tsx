import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(protected)/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)/(tabs)/create-listing" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)/(tabs)/profile" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
