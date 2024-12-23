import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Native Wind CSS
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    Ledger: require("../assets/fonts/Ledger/Ledger-Regular.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    Poppins: require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(protected)/(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(protected)/(tabs)/create-listing"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(protected)/details/index"
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen
          name="(protected)/(tabs)/profile"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
