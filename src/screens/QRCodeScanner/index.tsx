import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useNavigationState, useFocusEffect } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import { CameraView, useCameraPermissions } from "expo-camera";

import { useAccessLevels } from "../../hooks/useAccessLevels";
import { useBLEManager } from "../../hooks/useBLEManager";
import api from "../../services/api";

import { QRCodeScannerNavigationProps } from "./types";
import { Container, Camera, Scanner } from "./styles";

type QRCodeScannerRouteProps = { params: { nextPage: string } };

export function QRCodeScanner({ route }: { route: QRCodeScannerRouteProps }) {
  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();

  const navigation = useNavigation<QRCodeScannerNavigationProps>();
  const { disconnectDevice } = useBLEManager();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Reset do "scanned" sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      return () => setScanned(false);
    }, [])
  );

  const prevRouteName = useNavigationState((state: any) => {
    const idx = state?.index ?? 0;
    const prev = state?.routes?.[idx - 1];
    if (!prev) return undefined;

    if (prev.name === "DashboardTab") {
      const nested = prev.state as any;
      if (nested && typeof nested.index === "number" && Array.isArray(nested.routes)) {
        return nested.routes[nested.index]?.name;
      }
    }
    return prev.name;
  });

  async function safeGoBack() {
    // Evita erro de tipo e garante navegação de volta
    // @ts-expect-error: goBack pode não existir no tipo atual
    if (typeof navigation.canGoBack === "function" && navigation.canGoBack()) {
      // @ts-expect-error
      navigation.goBack();
    } else {
      navigation.navigate("Assets" as never);
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
        } as never);
      }
    } catch (error: any) {
      Toast.show(
        error?.response?.data?.message === "This device not exists"
          ? "Nenhum dispositivo correspondente foi encontrado. Certifique-se de que o QRCode está correto."
          : "Ocorreu um erro ao buscar o dispositivo. Por favor, verifique sua conexão, ou tente novamente mais tarde."
      );
      await safeGoBack();
    }
  }

  const onScannerData = useCallback(
    async (data: string) => {
      const scannerData = { bluetoothDeviceName: data };

      if (scannerData && prevRouteName === "Assets") {
        await getDeviceData(scannerData.bluetoothDeviceName);
        return;
      }

      navigation.navigate(route.params.nextPage as never, scannerData as never);
    },
    [navigation, route?.params?.nextPage, prevRouteName]
  );

  useEffect(() => {
    disconnectDevice();
  }, [disconnectDevice]);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission, requestPermission]);

  if (!permission || !permission.granted) {
    return <Container />;
  }

  return (
    <Container>
      <Camera
        style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={
          scanned
            ? undefined
            : ({ data }) => {
                setScanned(true);
                onScannerData(String(data));
              }
        }
      >
        <Scanner source={require("../../assets/images/qr-code-scanner.png")} />
      </Camera>
    </Container>
  );
}
