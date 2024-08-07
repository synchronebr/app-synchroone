import { TouchableOpacityProps } from "react-native";

export type MinutesIntervalButtonProps = TouchableOpacityProps & {
  title: string;
  selected: boolean;
};
