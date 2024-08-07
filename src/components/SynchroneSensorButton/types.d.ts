import { TouchableOpacityProps } from "react-native";
import { IEquipment } from "../../services/dtos/IEquipment";

export type Data = {
  nextPage: string;
};

export type QRCodeNavigationProps = {
  navigate(screen: string, data: Data): void;
};