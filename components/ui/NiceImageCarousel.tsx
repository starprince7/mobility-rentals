import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useState, useRef } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { NiceImage } from "./NiceImage";
import { StackView } from "./StackView";

interface Props {
  images: string[] | undefined;
  className: string;
  sharedTransitionTag?: string;
  carouselHeight?: number;
  carouselWidth?: number;
}

export function NiceImageCarousel({
  images,
  className,
  carouselHeight,
  carouselWidth,
  sharedTransitionTag,
}: Props) {
  const carouselRef = useRef<ICarouselInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get("window").width;

  if (!images) {
    return <View className={className}></View>;
  }

  // Convert string to array if needed
  const imageArray = typeof images === "string" ? images.split(",") : images;

  const scrollToIndex = (index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
  };

  return (
    <View
      className={`overflow-hidden ${className} ${
        !images ? "animate-[pulse_11s_ease-in-out_infinite]" : ""
      } bg-gray-100`}
    >
      <Carousel
        ref={carouselRef}
        style={{ backgroundColor: "transparent" }}
        loop
        width={carouselWidth || width}
        height={carouselHeight || width / 2}
        autoPlay={false}
        data={imageArray}
        scrollAnimationDuration={1000}
        onSnapToItem={(index: number) => setCurrentIndex(index)}
        renderItem={({ item, index, animationValue }) => (
          <NiceImage
            sharedTransitionTag={sharedTransitionTag}
            source={{ uri: item as string }}
            className={className}
          />
        )}
      />
      {imageArray && imageArray.length > 0 && (
        <StackView
          direction="horizontal"
          className="absolute bottom-0 left-0 justify-center gap-3 w-full pb-4"
        >
          {imageArray.map((image: string, index: number) => (
            <Pressable
              key={index}
              onPress={() => scrollToIndex(index)}
              className={`${currentIndex === index ? "w-4 h-4" : "w-2 h-2"} ${
                !images ? "animate-bounce" : ""
              } justify-center bg-white rounded-full`}
            ></Pressable>
          ))}
        </StackView>
      )}
    </View>
  );
}
