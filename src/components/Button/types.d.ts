import { TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  loading?: boolean;
  title: string;
};
