import * as Linking from "expo-linking"
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Provider, useSelector } from "react-redux"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NativeStackNavigationOptions } from "@react-navigation/native-stack"

// Native Wind CSS
import "../global.css"

// Redux Store
import { store } from "@/store"
import { DeepLinkListener, StripeConfigProvider } from "@/context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { selectAuth } from "@/store/auth-data/reducer"
import Toast from 'react-native-toast-message'

const queryClient = new QueryClient()

// Define screen configuration with strict types
type ScreenConfig = {
  name: string
  options?: NativeStackNavigationOptions
  isPrivate?: boolean
}

const screens: ScreenConfig[] = [
  { name: "index", options: { headerShown: false }, isPrivate: false },
  { name: "(onboarding)/login", options: { headerShown: false }, isPrivate: false },
  { name: "(onboarding)/signup", options: { headerShown: false }, isPrivate: false },
  { name: "(protected)/(tabs)", options: { headerShown: false, presentation: "card" }, isPrivate: true },
  { name: "(protected)/(tabs)/create-listing", options: { headerShown: false }, isPrivate: true },
  { name: "(protected)/details/index", options: { headerShown: false }, isPrivate: true },
  { name: '/(protected)/details/features', options: { headerShown: true, }, isPrivate: true },
  { name: "(protected)/booking", options: { headerShown: false, presentation: "modal" }, isPrivate: true },
  { name: "(protected)/booking-success", options: { headerShown: false, presentation: "fullScreenModal" }, isPrivate: true },
  { name: "(protected)/(tabs)/more", options: { headerShown: false }, isPrivate: true },
  // Routes of `More options` in tab button
  { name: "(protected)/more-option-screens/index", options: { headerShown: false }, isPrivate: true },
  { name: "(protected)/more-option-screens/account-screen", options: { headerShown: false }, isPrivate: true },
  { name: "(protected)/more-option-screens/edit-profile-screen", options: { headerShown: false, presentation: 'modal' }, isPrivate: true },
  { name: "(protected)/more-option-screens/intro-become-a-host-screen", options: { headerShown: false, presentation: 'modal' }, isPrivate: true },
  { name: "(protected)/more-option-screens/intro-become-a-host-screen/index", options: { headerShown: false, presentation: 'modal' }, isPrivate: true },
  { name: "(protected)/more-option-screens/intro-become-a-host-screen/expanded-wegot-your-back", options: { headerShown: false, presentation: 'modal' }, isPrivate: true },
  { name: "(protected)/more-option-screens/intro-become-a-host-screen/expanded-youare-covered", options: { headerShown: false, presentation: 'modal' }, isPrivate: true },
  { name: "(protected)/more-option-screens/intro-become-a-host-screen/expanded-how-it-works", options: { headerShown: false, presentation: 'modal' }, isPrivate: true },
  // Screen to track completed listing steps.
  { name: '(protected)/vehicle-listing-screens/listing-steps-involved', options: { headerShown: false, presentation: 'modal' }, isPrivate: true },
  // Collect location of Vehicle Screens
  { name: "(protected)/vehicle-listing-screens/(collect-vehicle-location)/list-your-vehicle-screen", options: { headerShown: true }, isPrivate: true },
  { name: "(protected)/vehicle-listing-screens/(collect-vehicle-location)/location-finder", options: { headerShown: false, presentation: 'fullScreenModal' }, isPrivate: true },
  { name: "(protected)/vehicle-listing-screens/(collect-vehicle-location)/vehicle-address", options: { headerShown: false, presentation: 'fullScreenModal' }, isPrivate: true },
  { name: "(protected)/vehicle-listing-screens/(collect-vehicle-location)/map-view-set-vehicle-location", options: { headerShown: false, presentation: 'fullScreenModal' }, isPrivate: true },
  // Vehicle Listing Step 1: (Your Car)
  { name: "(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect-license-plate", options: { headerShown: true }, isPrivate: true },
  { name: "(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_make_model_year", options: { headerShown: true }, isPrivate: true },
  { name: "(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_trim_and_style", options: { headerShown: true }, isPrivate: true },
  { name: "(protected)/vehicle-listing-screens/(collect-vehicle-info)/collect_usage_information", options: { headerShown: true } },
  // Vehicle Listing Step 2: (Personal Information)
  { name: "(protected)/vehicle-listing-screens/(collect-personal-info)/collect_profile_photo", options: { headerShown: false }, isPrivate: true },
  // Vehicle Listing Step 3: (Mobile number)
  { name: "(protected)/vehicle-listing-screens/confirm-mobile-number/index", options: { headerShown: false }, isPrivate: true },
  // Vehicle Listing Step 4: (Driver's License)
  { name: "(protected)/vehicle-listing-screens/collect-drivers-license", options: { headerShown: true }, isPrivate: true },
  // Vehicle Listing Step 5: (Host Goals)
  { name: "(protected)/vehicle-listing-screens/collect-goals-of-host", options: { headerShown: true }, isPrivate: true },
  // Vehicle Listing Step 6: (Car availability)
  { name: "(protected)/vehicle-listing-screens/collect-vehicle-availability", options: { headerShown: true }, isPrivate: true },
    // Verification Routes
  { name: "(protected)/(verification)/send-email-verification", options: { headerShown: false, presentation: 'fullScreenModal' }, isPrivate: true },
  { name: "(protected)/(verification)/enter-email-verification", options: { headerShown: false, presentation: 'fullScreenModal' }, isPrivate: true },
  { name: "(tabs)", options: { headerShown: false }, isPrivate: true },
  { name: "+not-found" }
];

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ledger: require("../assets/fonts/Ledger/Ledger-Regular.ttf"),
    AtypDisplayRegular: require("../assets/fonts/AtypDisplay/AtypDisplay-Regular.ttf"),
    AtypDisplayMedium: require("../assets/fonts/AtypDisplay/AtypDisplay-Medium.ttf"),
    AtypDisplayBold: require("../assets/fonts/AtypDisplay/AtypDisplay-Bold.ttf"),
    AtypDisplaySemiBold: require("../assets/fonts/AtypDisplay/AtypDisplay-Semibold.ttf"),
    AtypTextSemiBold: require("../assets/fonts/AtypDisplay/AtypText-Semibold.ttf"),
    AtypTextRegular: require("../assets/fonts/AtypDisplay/AtypText-Regular.ttf"),
    AtypTextMedium: require("../assets/fonts/AtypDisplay/AtypText-Medium.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StripeConfigProvider>
          <DeepLinkListener>
            <Provider store={store}>
              <StatusBar style="auto" />
              <AllScreens />
              <Toast 
                position='bottom'
                bottomOffset={60}
              />  
            </Provider>
          </DeepLinkListener>
        </StripeConfigProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}


function AllScreens() {
  const { isAuthenticated } = useSelector(selectAuth)
  return (
    <>
      <Stack>
        /**
         * Provide all the screen for the stack router to see
         * by mapping the screens array they are been provided.
         */
        {screens.map((screen, index) => {
          /**
           * Screen.private property tells the stack router that these screens
           * requires authentication check and authentication must be true.
           */
          if (screen.isPrivate) {
            return (
              <Stack.Protected guard={isAuthenticated} key={index}>
                <Stack.Screen
                  key={index}
                  name={screen.name}
                  options={screen.options as NativeStackNavigationOptions}
                />
              </Stack.Protected>
            )
          } else {
            return (
              <Stack.Protected guard={!isAuthenticated} key={index}>
                <Stack.Screen
                  key={index}
                  name={screen.name}
                  options={screen.options as NativeStackNavigationOptions}
                />
              </Stack.Protected>
            )
          }
        })}
      </Stack>
    </>
  )
}