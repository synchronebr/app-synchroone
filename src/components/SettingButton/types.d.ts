import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

export type SettingButtonProps = TouchableOpacityProps & {
  icon: React.FC<SvgProps>;
  title: string;
};
