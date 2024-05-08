import { MaskInputProps } from "react-native-mask-input";

type InputProps = MaskInputProps & {
  editable?: boolean;
  error?: string;
  label?: string;
  searchable?: boolean;
  secureTextEntry?: boolean;
};
