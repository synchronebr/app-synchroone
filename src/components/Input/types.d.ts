import { MaskInputProps } from "react-native-mask-input";

type InputProps = MaskInputProps & {
  editable?: boolean;
  error?: string;
  errorTextColor?: string;
  label?: string;
  labelColor?: string;
  searchable?: boolean;
  secureTextEntry?: boolean;
};
