
export type CheckboxProps = {
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
  checked: boolean;
  onChange: (checked: boolean) => void;
};
