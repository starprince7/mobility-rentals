import { Pressable, View } from "react-native"
import { FancyText } from "../ui"
import React from "react"

import { HeartIcon as HeartIconOutline } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"

export function VehicleModel({
  make,
  model,
  year,
}: {
  make: string
  model: string
  year: string | number
}) {
  return (
    <View className="mx-6 mt-1 mb-6">
      <FancyText
        fontBold
        className="text-2xl"
        endIcon={<LoveButton />}
        justifyContent="space-between"
      >
        {make} {model} {year}
      </FancyText>
    </View>
  )
}

const LoveButton = React.memo(() => {
  const [isLoved, setIsLoved] = React.useState(false)

  const handleLike = React.useCallback(() => {
    setIsLoved((prev) => !prev)
  }, [])

  if (!isLoved)
    return (
      <Pressable onPress={handleLike}>
        <HeartIconOutline color="black" />
      </Pressable>
    )
  return (
    <Pressable onPress={handleLike}>
      <HeartIcon color="black" />
    </Pressable>
  )
})
