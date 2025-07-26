import { ActivityIndicator, TouchableOpacity, TouchableWithoutFeedbackProps } from "react-native"
import React from "react"
import { useRouter } from "expo-router"
// Icons
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

interface Props {
  isLoading?: boolean
  onPress?: () => void
  color?: string
  size?: number
  className?: TouchableWithoutFeedbackProps["className"]
}

export default function CloseFloatingButton({
  onPress,
  className,
  color = "white",
  size = 26,
  isLoading = false,
}: Props) {
  const router = useRouter()
  
  const handlePress = async () => {
    if (onPress) onPress()
    else {
      router.back()
    }
  }

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={handlePress}
      className={`${className} absolute z-10 bg-gray-600/10 p-0.5 rounded-full`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <MaterialIcons name="close" size={size} color={color} />
      )}
    </TouchableOpacity>
  )
}
