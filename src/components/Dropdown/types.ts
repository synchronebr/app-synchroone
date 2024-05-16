import { PickerProps } from "@react-native-picker/picker";

export type PickerData = {
  label: string;
  value: string;
};

export type DropdownProps = PickerProps & {
  data: PickerData[];
  editable: boolean;
  label?: string;
};
