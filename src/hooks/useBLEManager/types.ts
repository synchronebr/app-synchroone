import { ReactNode } from "react";
import { BleManager, Device } from "react-native-ble-plx";

export type BLEManagerProviderProps = {
  children: ReactNode;
};

export type IBLEManagerContextData = {
  allowed: boolean;
  isBluetoothOn: boolean;
  isLoading: boolean;
  manager: BleManager;
  connecting: boolean;
  connectedDevice?: Device;
  sendCommand: (device: Device, command: string) => void;
  connectDevice: (device: Device) => void;
  scanDevices: (bluetoothDeviceName: string) => void;
  getPermissions: () => Promise<boolean>;
  disconnectDevice: () => void;
};
