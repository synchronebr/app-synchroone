export type QRCodeScannerNavigationProps = {
  navigate(screen: string, data: ScannerData): void;
};

export type ScannerData = {
  bluetoothDeviceName: string;
};
