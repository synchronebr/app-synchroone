import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Toast } from "react-native-toast-notifications";

import {
  Container,
  Buttons,
  Button,
  ButtonTitle,
  BLEOptionContainer,
  BLEOption,
  BLEOptionTitle,
} from "./styles";
import { useBLEManager } from "../../hooks/useBLEManager";
import { ActivityIndicator } from "react-native";

export function PreConfigureSensor({ route }) {
  const [, requestPermission] = useCameraPermissions();
  const { scanAvailableDevices } = useBLEManager();
  const [bleLoading, setBleLoading] = useState(null);
  const [devices, setDevices] = useState([]);

  const navigation = useNavigation();
  const THEME = useTheme();

  const notificationsIconSize = 22;

  async function getCameraPermission() {
    const { granted } = await requestPermission();
  
    if (granted) {
      navigation.navigate("QRCodeScanner" as never, {
        nextPage: "ConfigureParameters",
      });
    }
  } 

  async function getAvailableDevice() {
    setBleLoading(true);
    const devices = await scanAvailableDevices(route.params.type);
    setDevices(devices);
    if (!devices || devices.length === 0) {
      Toast.show(
        "Não foi possível encontrar nenhum device! Tente novamente mais tarde.",
        { type: "danger" }
      );
    }
    setBleLoading(false);
  }

  async function goToConfigureParameters(name) {
    navigation.navigate("ConfigureParameters" as never, {
      bluetoothDeviceName: name,
    });
  }

  return (
    <Container>
      <Buttons>
        <Button onPress={getCameraPermission}>
          <ButtonTitle>Ler QRCode</ButtonTitle>
        </Button>
        <Button onPress={getAvailableDevice}>
          <ButtonTitle>Buscar sensores</ButtonTitle>
        </Button>

        <BLEOptionContainer>
      {bleLoading ? 
          (<ActivityIndicator color={THEME.colors.dark} />) :
          (<>
            {devices.map((device) => (<BLEOption onPress={() => goToConfigureParameters(device.name)} ><BLEOptionTitle>{device.name}</BLEOptionTitle></BLEOption>))}
          </>)
        }
        </BLEOptionContainer>
      </Buttons>

      
    </Container>
  );
}
