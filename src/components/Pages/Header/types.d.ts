export type HeaderProps<T> = {
  title: string;
  variant?: 'primary' | 'secondary';
  backIcon?: "entypo" | "back";
  backPress?: () => void;
  infoIcon?: boolean;
  infoPress?: () => void;
  leftContent?: React.ReactNode;  
  rightContent?: React.ReactNode;  
};