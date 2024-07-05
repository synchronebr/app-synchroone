import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

export type ConnectionButtonProps = TouchableOpacityProps & {
  icon: React.FC<SvgProps>;
  title: string;
  isActive?: boolean;
};

export type ConnectionButtonStyleProps = {
  isActive?: boolean;
};
