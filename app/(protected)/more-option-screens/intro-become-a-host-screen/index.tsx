import { View, Text, SafeAreaView, Pressable } from "react-native"
import React from "react"
import { FancyText, FixedBottomView, NiceButton, NiceImage, StackView } from "@/components/ui"
import { formatToCurrency } from "@/utils"
import { ScrollView } from "react-native-gesture-handler"

// Icons
import Octicons from "@expo/vector-icons/Octicons"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useRouter } from "expo-router"
import CloseFloatingButton from "@/components/ui/CloseFloatingButton"

const HOW_IT_WORKS = [
  {
    href: "(protected)/more-option-screens/intro-become-a-host-screen/expanded-how-it-works",
    id: 1,
    icon: <Octicons name="tools" size={50} color="#a1a1aa" />,
    title: "How it works",
    description: `Listing is free, and you can set your own prices, availability, andrules. Pickup and return are simple, and you'll get paid quickly after each trip. We're here to help along the way.`,
  },
  {
    href: "(protected)/more-option-screens/intro-become-a-host-screen/expanded-youare-covered",
    id: 2,
    icon: <MaterialCommunityIcons name="shield-key-outline" size={50} color="#a1a1aa" />,
    title: "You're covered",
    description: `Each protection plan comes standard with NGN1.17 billion. in third-party liability insurance provided under a policy issued to Lapp by Travelers Excess and Surplus Lines Company. Varying levels of vehicle protection are available. just in case there's a mishap.`,
  },
  {
    href: "(protected)/more-option-screens/intro-become-a-host-screen/expanded-wegot-your-back",
    id: 3,
    icon: <MaterialCommunityIcons name="account-convert-outline" size={50} color="#a1a1aa" />,
    title: "We've got your back",
    description: `From our guest screening to 24/7 customer support, you can always share your car with confidence.`,
  },
]

export default function IntroBecomeAHostScreen() {
  const router = useRouter()
  return (
    <>
      <ScrollView>
        <CloseFloatingButton color="white" className="right-6 top-11" size={22}/>
        <NiceImage
          source={require("../../../../assets/images/become-a-host-image.jpg")}
          // style={{ width: 200, height: 400 }}
          className="w-full h-64"
        />
        <View className="px-6 py-3.5 gap-y-2">
          <FancyText className="text-3xl" iosFontFamily="AtypDisplaySemiBold">
            Become a host
          </FancyText>
          <FancyText className="text-zinc-700">
            join thousands of hosts earning more than {formatToCurrency(15000000, "NGN")} per year
            per car on Lapp, Africa's largest car sharing marketplace.
          </FancyText>
        </View>
        <View className="mb-40">
          {HOW_IT_WORKS.map((item) => (
            <Pressable key={item.id} onPress={() => router.push(item.href as any)}>
              <StackView
                key={item.id}
                direction="horizontal"
                className=" bg-zinc-200 mx-6 px-6 py-8 border-zinc-300 border gap-5 items-stretch my-3 rounded-3xl"
              >
                {item.icon}
                <View className="flex-1 gap-5">
                  <FancyText className="text-xl" iosFontFamily="AtypDisplaySemiBold">
                    {item.title}
                  </FancyText>
                  <FancyText className="w-72 mb-2 text-zinc-700">{item.description}</FancyText>
                  <NiceButton href={item.href as any} size="small" className="w-36">
                    Learn more
                  </NiceButton>
                </View>
              </StackView>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <FixedBottomView className="h-[168px]">
        <NiceButton
          onPress={() =>
            router.replace(
              "/(protected)/vehicle-listing-screens/(collect-vehicle-location)/list-your-vehicle-screen",
            )
          }
          className="mt-1"
        >
          Get started
        </NiceButton>
      </FixedBottomView>
    </>
  )
}
