import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacity,
  View,
} from "react-native"
import React, { ComponentProps } from "react"
import { FancyText } from "./FancyText"
import { Link } from "expo-router"

interface Props {
  loading?: boolean
  children: React.ReactNode
  className?: string
  size?: "small" | "large"
  onPress?: (event: GestureResponderEvent) => void
  variant?: "outline" | "solid" | "text"
  href?: ComponentProps<typeof Link>["href"]
  disabled?: boolean
}

export const NiceButton = React.memo(
  React.forwardRef<View, Props>(
    (
      {
        children,
        loading = false,
        className = "",
        size = "large",
        variant = "solid",
        onPress,
        href,
        disabled = false,
        ...props
      },
      ref,
    ) => {
      const getVariantClasses = () => {
        if (disabled) {
          return variant === "solid"
            ? "bg-zinc-400 "
            : "bg-transparent border-2 border-gray-300 active:bg-transparent"
        }

        switch (variant) {
          case "outline":
            return "bg-transparent border-2 border-black active:bg-black/5"
          case "text":
            return "bg-transparent active:bg-black/5"
          case "solid":
          default:
            return "bg-black"
        }
      }

      const getTextClasses = () => {
        const baseTextClasses = "text-center font-semibold"
        const sizeTextClasses = size === "large" ? "text-xl" : ""
        let variantTextClasses = variant === "solid" ? "text-white" : "text-black"

        // Override text color if disabled
        if (disabled) {
          variantTextClasses =
            variant === "solid" ? "text-gray-100" : "text-gray-400"
        }

        return `${baseTextClasses} ${sizeTextClasses} ${variantTextClasses}`
      }

      const getPaddingClasses = () => {
        if (variant === "text") {
          return "p-2" // Less padding for text variant
        }
        if (size === "small") {
          return "py-4 px-6" // Less padding for small size
        }
        return "p-5"
      }

      const baseClasses = `${getPaddingClasses()}`
      const sizeClasses = size === "large" ? "rounded-[30px]" : "rounded-[26px] py-5"
      const variantClasses = getVariantClasses()
      const textClasses = getTextClasses()

      // Create the button content based on loading state
      const buttonContent = loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "solid" && !disabled ? "white" : "black"}
        />
      ) : (
        <FancyText className={textClasses}>{children}</FancyText>
      )

      // Handle the onPress when disabled or loading
      const handlePress = disabled || loading ? undefined : onPress

      // Create the TouchableOpacity element directly
      const touchableElement = (
        <TouchableOpacity
          ref={ref}
          onPress={handlePress}
          className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
          activeOpacity={disabled || loading ? 1 : 0.2} // Prevent the active state when disabled or loading
          {...props}
        >
          {buttonContent}
        </TouchableOpacity>
      )

      // Conditionally wrap with Link if href is provided and not disabled/loading
      if (href && !disabled && !loading) {
        return (
          <Link href={href} asChild>
            {touchableElement}
          </Link>
        )
      }

      return touchableElement
    },
  ),
)

NiceButton.displayName = "NiceButton"
