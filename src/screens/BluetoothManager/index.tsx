import React, { useState, useEffect } from "react";
import { ActivityIndicator, PermissionsAndroid, Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { BleManager, Device } from "react-native-ble-plx";
import { Toast } from "react-native-toast-notifications";

import { BluetoothDevice } from "../../components/BluetoothDevice";

import {
  BluetoothOffContainer,
  BluetoothOffMessage,
  Container,
  Divider,
  List,
  ConnectingInfo,
  Text,
} from "./styles";

export function BluetoothManager() {
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState<Device[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const THEME = useTheme();

  async function scanDevices() {
    try {
      setIsLoading(true);
      setDevices([]);
      setConnectedDevice(null);

      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          Toast.show(
            "Erro ao escanear dispositivos Bluetooth. Verifique e tente novamente."
          );
          setIsLoading(false);
          return;
        }

        setDevices((prevDevices) => {
          if (!prevDevices.some((d) => d.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      });

      setTimeout(() => {
        manager.stopDeviceScan();
        setIsLoading(false);
      }, 5000);
    } catch (error) {
      Toast.show(
        "Erro ao escanear dispositivos Bluetooth. Verifique e tente novamente."
      );
      setIsLoading(false);
    }
  }

  async function connectDevice(device: Device) {
    if (device.id === connectedDevice?.id) return;

    setConnecting(true);

    try {
      const connectedDevice = await device.connect();

      setConnectedDevice(connectedDevice);
    } catch (error) {
      Toast.show(
        `Falha ao conectar ao dispositivo Bluetooth ${device.name}. Verifique e tente novamente.`
      );
    } finally {
      setConnecting(false);
    }
  }

  async function getPermissions() {
    if (Platform.OS === "android") {
      const permissionsAccessFineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      const permissionsBluetoothScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
      );
      const permissionsBluetoothConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      );

      if (
        permissionsAccessFineLocation === "granted" &&
        permissionsBluetoothScan === "granted" &&
        permissionsBluetoothConnect === "granted"
      ) {
        scanDevices();
      } else {
        Toast.show("Permissões necessárias não foram concedidas.");
      }
    }
  }

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === "PoweredOn") {
        setIsBluetoothOn(true);
        getPermissions();
        subscription.remove();
      } else {
        setIsBluetoothOn(false);
      }
    }, true);
  }, [manager]);

  if (!isBluetoothOn) {
    return (
      <BluetoothOffContainer>
        <BluetoothOffMessage>
          O Bluetooth do seu dispositivo está desligado. Por favor, ative-o para
          escanear os dispositivos próximos.
        </BluetoothOffMessage>
      </BluetoothOffContainer>
    );
  }

  return (
    <Container>
      <List
        data={devices}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <BluetoothDevice
            disabled={connecting}
            onPress={() => connectDevice(item)}
            isConnected={connectedDevice?.id === item.id}
            device={item}
          />
        )}
      />

      {connecting && (
        <ConnectingInfo>
          <Text>Conectando no dispositivo ...</Text>
          <ActivityIndicator color={THEME.colors.primary} />
        </ConnectingInfo>
      )}
    </Container>
  );
}
