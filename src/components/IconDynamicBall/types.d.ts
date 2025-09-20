export type IconName = 'chevron-left' | 'add-a-photo' | 'add-photo-alternate';

export type AccordionProps<T> = {
    icon: IconName;
    onPress?: (event: GestureResponderEvent) => void;
}

