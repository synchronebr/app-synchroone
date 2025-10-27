
export type SelectProps<T> = {
  key?: string;
  label?: string
  placeholder?: string
  selected?: T
  onSelect: (selected: T) => void
  editable: boolean;
  error?: string;
  errorTextColor?: string;
}

