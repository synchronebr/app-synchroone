import React, { useState, useEffect } from "react";
import { ActivityIndicator, PermissionsAndroid, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { BleManager, Device } from "react-native-ble-plx";
import { Buffer } from "buffer";
import { Toast } from "react-native-toast-notifications";

import { BluetoothManagerRouteProps } from "./types";
import {
  BluetoothOffContainer,
  BluetoothOffMessage,
  Container,
  ConnectingInfo,
  Text,
} from "./styles";
import { ButtonWrapper } from "../Login/styles";
import { Button } from "../../components/Button";

const serviceUUID = "ab0828b1-198e-4351-b779-901fa0e0371e";
const characteristicUUID = "4ac8a682-9736-4e5d-932b-e9b31405049c";

export function BluetoothManager() {
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [manager] = useState(new BleManager());
  const [connecting, setConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const route = useRoute();
  const THEME = useTheme();

  const params: BluetoothManagerRouteProps =
    route.params as BluetoothManagerRouteProps;

  async function sendCommand(
    device: Device,
    command: string,
  ) {
    try {
      const base64Command = Buffer.from(command).toString("base64");

      const response = await device.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        base64Command
      );
      
      console.log(command)
      // console.log(response);
      Toast.show("Comando enviado com sucesso!");
    } catch (error) {
      console.log(error);
      Toast.show("Erro ao conectar dispositivo");
    }
  }

  async function sendCommandTest() {
    if (!await connectedDevice.isConnected()) {
      await connectedDevice.connect()
    } 
    
    await connectedDevice.discoverAllServicesAndCharacteristics();
    const services = await connectedDevice.services();
    const serviceUUID = services[0].uuid;
    const characteristics = await connectedDevice.characteristicsForService(
      serviceUUID
    );
    const characteristicUUID = characteristics[0].uuid;
    sendCommand(connectedDevice, "SSYNC-OK");
    // sendCommand(connectedDevice, `SN:${params.bluetoothDeviceName}`);
    sendCommand(connectedDevice, "SN:150993");
    sendCommand(connectedDevice, "PASS:150993");
    sendCommand(connectedDevice, "SYNC-TD:10");
    sendCommand(connectedDevice, "SYNC-STH:100");
    sendCommand(connectedDevice, "SYNC-SM:10");
    sendCommand(connectedDevice, "SYNC-SI:100");
    sendCommand(connectedDevice, "SYNC-SME:10");
    sendCommand(connectedDevice, "SYNC-SB:10");
    sendCommand(connectedDevice, "SYNC-TPB:10");
    sendCommand(connectedDevice, "SYNC-TBLE:30");
    sendCommand(connectedDevice, "SYNC-FINISH");
  }

  async function connectDevice(device: Device) {
    setConnecting(true);
    try {
      await device.connect();
      await device.discoverAllServicesAndCharacteristics();
      setConnectedDevice(device);
      console.log(`Conectado ao dispositivo: ${device.name}`);
    } catch (error) {
      console.log(error);
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
          console.log(error);
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
      console.log(error);
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
    return () => {
      subscription.remove();
      manager.destroy();
    };
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
          <Text>Procurando dispositivo {params.bluetoothDeviceName}. Por favor, aguarde...</Text>
          <ActivityIndicator color={THEME.colors.primary} />
        </ConnectingInfo>
      )}

      {connecting && (
        <ConnectingInfo>
          <Text>Conectando ao dispositivo {params.bluetoothDeviceName}. Por favor, aguarde ...</Text>
          <ActivityIndicator color={THEME.colors.primary} />
        </ConnectingInfo>
      )}

      {!isLoading && !connectedDevice && (
        <>
          <Text>Nenhum dispositivo Synchrone encontrado.</Text>
          <ButtonWrapper>
            <Button title="Tentar novamente" onPress={() => scanDevices()} />
          </ButtonWrapper>
        </>
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

          <ButtonWrapper>
            <Button title="Enviar comando" onPress={()=> sendCommandTest()} />
          </ButtonWrapper>

          <ButtonWrapper>
            <Button title="Reconectar" onPress={() => scanDevices()} />
          </ButtonWrapper>
        </>
      )}
    </Container>
  );
}
