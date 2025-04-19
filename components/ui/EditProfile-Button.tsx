import { TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Props {
  onPress?: () => void;
  color?: string;
}

export default function EditProfileButton({
  onPress,
  color = "white",
}: Props) {
  const router = useRouter();
  const handlePress = () => {
    if (!onPress) router.push('/(protected)/more-option-screens/edit-profile-screen');
    else onPress();
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="absolute top-16 right-5 z-10 bg-gray-600/10 p-2 rounded-full"
    >
      <MaterialIcons name="edit" size={26} color={color} />
    </TouchableOpacity>
  );
}
