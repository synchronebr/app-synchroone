
export type AccordionProps<T> = {
  isExpanded: SharedValue<boolean>  ;
  children: ReactNode;
  viewKey: string;
  style?: any;
  duration?: number;
}

