import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet"
import { FancyText } from "./FancyText"

// Define our item interface
interface Item {
  id: string
  title: string
  description?: string
}

interface FancyListProps {
  items: string[]
  onSelectItem: (item: string) => void
  initialSnapPoint?: number // Index of initial snap point
  title?: string
}

export const FancyList: React.FC<FancyListProps> = ({
  items,
  onSelectItem,
  initialSnapPoint = 1,
  title = "Select an item",
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    null,
  )

  // Define bottom-sheet snap points
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], [])

  // Custom spring animations
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  })

  useEffect(() => {
    // This will open the sheet when the component mounts
    bottomSheetRef.current?.expand()
  }, [])

  // Handle item selection
  const handleSelectItem = useCallback(
    (item: string) => {
      setSelectedItemId(item)
      onSelectItem(item)
      // Optionally close the sheet after selection
      bottomSheetRef.current?.close()
    },
    [onSelectItem],
  )

  // Render backdrop
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  )

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={initialSnapPoint}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      animationConfigs={animationConfigs}
      handleIndicatorStyle={{
        backgroundColor: "#94a3b8",
        width: 40,
      }}
    >
      <BottomSheetScrollView style={styles.container}>
        <FancyText style={styles.title}>{title}</FancyText>

        <View style={styles.itemsContainer} className="pb-36">
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.itemContainer,
                selectedItemId === item && styles.selectedItem,
              ]}
              onPress={() => handleSelectItem(item)}
            >
              <FancyText style={styles.itemTitle}>{item}</FancyText>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1f2937",
  },
  itemsContainer: {
    gap: 8,
  },
  itemContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  selectedItem: {
    backgroundColor: "#eff6ff",
    borderColor: "#3b82f6",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 4,
    color: "#6b7280",
  },
})
