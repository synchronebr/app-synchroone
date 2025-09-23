export type IconName = 'chevron-left' | 'add-a-photo' | 'add-photo-alternate' | "flash-off" | "flash";

export type AccordionProps<T> = {
    icon: IconName;
    onPress?: (event: GestureResponderEvent) => void;
}

