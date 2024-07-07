import React, { useState, useEffect } from "react";
import { ActivityIndicator, PermissionsAndroid, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { BleManager, Device } from "react-native-ble-plx";
import { Toast } from "react-native-toast-notifications";

import { BluetoothManagerRouteProps } from "./types";
import {
  BluetoothOffContainer,
  BluetoothOffMessage,
  Container,
  ConnectingInfo,
  Text,
} from "./styles";

export function BluetoothManager() {
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [manager] = useState(new BleManager());
  const [connecting, setConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const route = useRoute();
  const THEME = useTheme();

  const params: BluetoothManagerRouteProps =
    route.params as BluetoothManagerRouteProps;

  async function connectDevice(device: Device) {
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

  async function scanDevices() {
    try {
      setIsLoading(true);
      setConnectedDevice(null);

      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          Toast.show(
            "Erro ao escanear dispositivos Bluetooth. Verifique e tente novamente."
          );
          setIsLoading(false);
          return;
        }

        if (device.name === params.bluetoothDeviceName) {
          manager.stopDeviceScan();
          connectDevice(device);
        }
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
      {isLoading && (
        <ConnectingInfo>
          <Text>Procurando dispositivos Bluetooth. Por favor, aguarde...</Text>
          <ActivityIndicator color={THEME.colors.primary} />
        </ConnectingInfo>
      )}

      {connecting && (
        <ConnectingInfo>
          <Text>Conectando ao dispositivo. Por favor, aguarde ...</Text>
          <ActivityIndicator color={THEME.colors.primary} />
        </ConnectingInfo>
      )}

      {!isLoading && !connectedDevice && (
        <Text>Nenhum dispositivo Synchrone encontrado.</Text>
      )}

      {connectedDevice && (
        <>
          <FontAwesome
            style={{
              marginBottom: 16,
            }}
            name="bluetooth"
            size={128}
            color={THEME.colors.success}
          />
          <Text>
            Conectado no dispositivo{"\n"}
            {connectedDevice.name}
          </Text>
        </>
      )}
    </Container>
  );
}
