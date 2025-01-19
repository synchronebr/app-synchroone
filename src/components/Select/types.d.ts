
export type SelectProps<T> = {
  label?: string
  placeholder?: string
  selected?: T
  values: Array<{ label: string, value: T }>
  onSelect: (selected: T) => void
  editable: boolean;
  error?: string;
  errorTextColor?: string;
}

