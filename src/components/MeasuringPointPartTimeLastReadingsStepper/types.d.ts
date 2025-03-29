import { TouchableOpacityProps } from "react-native";

export type MeasurementPointCardNavigationProps = {
  navigate(screen: string, { id: number, item: any }): void;
};

export type MeasurementPointCardProps = TouchableOpacityProps;
