export type HeaderProps<T> = {
  pieceName: string;
  pathName?: string;
  securityStatus: string;
  imageURL?: string;
  isLoading?: boolean;
  setOpenCamera?: React.Dispatch<React.SetStateAction<boolean>>;
  sendImage?: (image: any) => void;
};