import { TouchableOpacityProps } from "react-native";

export type AssetCardNavigationProps = {
  navigate(screen: string): void;
};

export type AssetCardProps = TouchableOpacityProps;
