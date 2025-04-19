// Icons
import {
  AndroidPlayIcon,
  BluetoothIcon,
  ChildIcon,
  GpsIcon,
  HeatedSeatIcon,
  NoKeyIcon,
  RearCameraIcon,
  SeatHeatedIcon,
  TransmissionIcon,
  UsbIcon,
  IceIcon,
  BoltIcon,
  ElectricPowerIcon,
} from "@/assets/icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "react-native";


// Function to map feature labels to their respective icons
const getIconForFeature = (label: string) => {
  switch (label.toLowerCase()) {
    case "electric":
      return <ElectricPowerIcon color="#171717" />;
    case "hybrid":
      return <BoltIcon color="#171717" />;
    case "air conditioning":
      return <IceIcon color="#171717" />;
    case "automatic transmission":
      return <TransmissionIcon color="#171717" />;
    case "android auto":
      return <AndroidPlayIcon color="#171717" />;
    case "bluetooth":
      return <BluetoothIcon color="#171717" />;
    case "apple carplay":
      return <AntDesign name="apple1" size={22} color="#171717" />;
    case "backup camera":
      return <RearCameraIcon color="#171717" />;
    case "blind spot warning":
      return (
        <Image
          source={require("../../assets/icons/blind-spot-icon.png")}
          className="w-11 h-11"
        />
      );
    case "child seat":
      return <ChildIcon color="#171717" />;
    case "convertible":
      return (
        <Image
          source={require("../../assets/icons/blind-spot-icon.png")}
          className="w-11 h-11"
        />
      );
    case "gps":
      return <GpsIcon color="#171717" />;
    case "heated seats":
      return <HeatedSeatIcon color="#171717" />;
    case "keyless entry":
      return <NoKeyIcon color="black" />;
    case "usb charger":
      return <UsbIcon color="black" />;
    default:
      return null;
  }
};

export default getIconForFeature;
