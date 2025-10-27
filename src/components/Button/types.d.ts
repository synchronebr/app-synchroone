import { TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  title: string;
};
