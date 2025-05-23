import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface ElectricPowerIconProps extends SvgProps {
  size?: number;
  color?: string;
}

const ElectricPowerIcon: React.FC<ElectricPowerIconProps> = ({
  size = 24,
  color = "#e3e3e3",
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
      {...props}
    >
      <Path d="m470-254 57-56-38-38q-5-5-7-10.5t-2-11.5q0-7 2-12.5t7-10.5l38-38q16-16 24.5-36t8.5-42q0-23-8.5-43.5T527-589l-38-38-56 57 37 37q5 5 7.5 10.5T480-510q0 6-2.5 11.5T470-488l-37 38q-16 16-24.5 36t-8.5 43q0 23 8.5 43.5T433-291l37 37ZM320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-80h240v-560H360v560Zm0 0h240-240Z" />
    </Svg>
  );
};

export default ElectricPowerIcon;
