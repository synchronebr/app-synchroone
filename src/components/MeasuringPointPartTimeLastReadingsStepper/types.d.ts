import { TouchableOpacityProps } from "react-native";

export type MeasurementPointCardNavigationProps = {
  navigate(screen: string, { id: number }): void;
};

export type MeasurementPointCardProps = TouchableOpacityProps;
