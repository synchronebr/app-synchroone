export type HeaderProps<T> = {
  pieceName: string;
  pathName: string;
  securityStatus: string;
  imageURL?: string;
  setOpenCamera?: React.Dispatch<React.SetStateAction<boolean>>;
  updateImage?: (image: ImagePicker.ImagePickerAsset) => void;
};