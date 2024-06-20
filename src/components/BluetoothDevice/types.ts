import { TouchableOpacityProps } from 'react-native';
import { Device } from 'react-native-ble-plx';

export type BluetoothDeviceProps = TouchableOpacityProps & {
  isConnected?: boolean;
  device: Device;
};

export type ConnectionInfoTextStyleProps = {
  isConnected?: boolean;
};
