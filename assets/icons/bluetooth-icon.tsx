import React from "react";
import Svg, { Path } from "react-native-svg";

interface AndroidPlayIconProps {
  size?: number;
  color?: string;
}

const BluetoothIcon: React.FC<AndroidPlayIconProps> = ({
  size = 24,
  color = "#e3e3e3",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960" fill={color}>
      <Path d="M440-80v-304L256-200l-56-56 224-224-224-224 56-56 184 184v-304h40l228 228-172 172 172 172L480-80h-40Zm80-496 76-76-76-74v150Zm0 342 76-74-76-76v150Z" />
    </Svg>
  );
};

export default BluetoothIcon;
