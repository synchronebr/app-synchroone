import React, { useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";

import { useAccessLevels } from "../../hooks/useAccessLevels";
import { useBLEManager } from "../../hooks/useBLEManager";

import api from "../../services/api";

import { QRCodeScannerNavigationProps } from "./types";
import { Container, Camera, Scanner } from "./styles";

export function QRCodeScanner({ route }) {
  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();

  const navigation = useNavigation<QRCodeScannerNavigationProps>();
  const { disconnectDevice } = useBLEManager();

  function getPrevScreen() {
    const state = navigation.getState();
    const routes = state.routes;
    const previousRoute = routes[routes.length - 2];

    if (previousRoute?.name === "DashboardTab" && previousRoute.state) {
      const tabRoutes = previousRoute.state.routes;
      const activeTabIndex = previousRoute.state.index;
      const activeTabRoute = tabRoutes[activeTabIndex];

      return activeTabRoute.name;
    }
  }

  async function getDeviceData(bluetoothDeviceName: string) {
    try {
      const { data, status } = await api.get(
        `companies/${currentCompany.companyId}/devices/${bluetoothDeviceName}`
      );

      if (status === 200 && data.device.measuringPoint.length > 0) {
        navigation.navigate("AssetDetails", {
          id: data.device.measuringPoint[0].piece.id,
        });
      }
    } catch (error) {
      Toast.show(
        error.response.data.message === "This device not exists"
          ? "Nenhum dispositivo correspondente foi encontrado. Certifique-se de que o QRCode está correto."
          : "Ocorreu um erro ao buscar o dispositivo. Por favor, verifique sua conexão, ou tente novamente mais tarde."
      );

      navigation.goBack();
    }
  }

  async function onScannerData(data: string) {
    const scannerData = {
      bluetoothDeviceName: data,
    };

    if (scannerData && getPrevScreen() === "Assets")
      return await getDeviceData(scannerData.bluetoothDeviceName);

    navigation.navigate(route.params.nextPage, scannerData);
  }

  useEffect(() => {
    disconnectDevice();
  }, []);

  return (
    <Container>
      <Camera
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={({ data }) => onScannerData(data)}
      >
        <Scanner source={require("../../assets/images/qr-code-scanner.png")} />
      </Camera>
    </Container>
  );
}
