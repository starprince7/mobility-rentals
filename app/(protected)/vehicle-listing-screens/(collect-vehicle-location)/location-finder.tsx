import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native"
import React from "react"
import GoBackButtonFloating from "@/components/ui/GoBackFloatingButton"
import { sleep } from "@/utils"
import { useSearchLocations } from "@/hooks"
import { FancyText } from "@/components/ui"
import { MapPinIcon } from "react-native-heroicons/solid"
import { useDispatch } from "react-redux"
import { useRouter } from "expo-router"
import { setLocation } from "@/store/vehicle-onboarding-data/reducer"

export default function LocationFinder() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { setQuery, locationResults, isLoading } =
    useSearchLocations()
  const inputRef = React.useRef<TextInput>(null)

  React.useEffect(() => {
    ;(async () => {
      // Wait to ensure component is fully mounted
      await sleep(200)
      inputRef.current?.focus()
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButtonFloating type="close" color="black" />
      <KeyboardAvoidingView className="flex-1">
        <View className="flex-1 px-6 pt-16">
          <TextInput
            ref={inputRef}
            placeholder="Enter address"
            className="border-zinc-400 border-b rounded-md px-1 py-4 placeholder:text-gray-600"
            style={styles.input}
            placeholderTextColor="#9CA3AF" // Explicitly set placeholder color
            onChangeText={setQuery}
          />
          {/* Location Results */}
          {isLoading && (
            <ActivityIndicator size="small" className="my-5" />
          )}
          <ScrollView className="flex-1 mt-6">
            {!!locationResults.length &&
              locationResults.map((result, i) => (
                <TouchableOpacity
                  key={result.properties.place_id + i}
                  onPress={() => {
                    console.log(JSON.stringify(result.properties))
                    dispatch(
                      setLocation({
                        city: result.properties.city!,
                        country: result.properties?.country,
                        countryCode: result.properties?.country_code,
                        state: result.properties.state,
                        latitude: result.properties.lat,
                        longitude: result.properties.lon,
                        streetAddress: "",
                        zipCode: "",
                      }),
                    )
                    // Alert.alert("Dispatched!", JSON.stringify(result.properties));
                    router.push(
                      "/vehicle-listing-screens/vehicle-address",
                    )
                  }}
                >
                  <FancyText
                    startIcon={
                      <MapPinIcon size={25} color="#EC4E20" />
                    }
                    className="my-3 text-base text-zinc-600"
                  >
                    {result.properties.formatted}
                  </FancyText>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    color: "black",
    fontSize: 16,
  },
})
