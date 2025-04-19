import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface BoltIconProps extends SvgProps {
  size?: number;
  color?: string;
}

const BoltIcon: React.FC<BoltIconProps> = ({
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
      <Path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
    </Svg>
  );
};

export default BoltIcon;