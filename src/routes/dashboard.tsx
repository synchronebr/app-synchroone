import { Entypo } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";

import { DashboardTab } from "./dashboard-tab";
import { Companies } from "../screens/Companies";
import { Notifications } from "../screens/Notifications";
import { NotificationDetails } from "../screens/NotificationDetails";
import { QRCodeScanner } from "../screens/QRCodeScanner";
import { PreConfigureSensor } from "../screens/PreConfigureSensor";
import { PreConfigureGateway } from "../screens/PreConfigureGateway";
import { ConfigureParameters } from "../screens/ConfigureParameters";
import { ConfigureGateway } from "../screens/ConfigureGateway";
import { AssetDetails } from "../screens/AssetDetails";
import { EditAssetDetails } from "../screens/EditAssetDetails";
import { MeasurementPointDetails } from "../screens/MeasurementPointDetails";
import { MeasurementHistory } from "../screens/MeasurementHistory";
import { Manuals } from "../screens/Manuals";
import { MyData } from "../screens/MyData";
import { Languages } from "../screens/Languages";
import { Countries } from "../screens/Countries";
import { AlertDetails } from "../screens/AlertDetails";
import { AlertPrescriptionDetails } from "../screens/AlertPrescriptionDetails";
import { DiagnosesByPiece } from "../screens/DiagnosesByPiece";
import { Device } from "../screens/Device";
import { DeviceGateway } from "../screens/DeviceGateway";
import { t } from "i18next";

export function Dashboard() {
  const { Navigator, Screen } = createStackNavigator();

  const THEME = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerShown: true,
        headerStyle: {
          backgroundColor: THEME.colors.light,
          elevation: null,
        },
        headerBackImage: () => (
          <Entypo color={THEME.colors.primary} name="chevron-left" size={28} />
        ),
        headerTintColor: THEME.colors.primary,
        headerTitleStyle: {
          fontFamily: THEME.fonts.semiBold,
          fontSize: THEME.fontSize.larger,
          lineHeight: 24,
        },
      }}
    >
      <Screen
        component={DashboardTab}
        name="DashboardTab"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={Companies}
        name="Companies"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={PreConfigureSensor}
        name="PreConfigureSensor"
        options={{
          headerBackImage: () => (
            <Entypo color={THEME.colors.light} name="chevron-left" size={28} />
          ),
          headerStyle: {
            backgroundColor: THEME.colors.primary,
          },
          headerTintColor: THEME.colors.light,
          headerTitle: "Configurar Sensor",
        }}
      />
      <Screen
        component={PreConfigureGateway}
        name="PreConfigureGateway"
        options={{
          headerBackImage: () => (
            <Entypo color={THEME.colors.light} name="chevron-left" size={28} />
          ),
          headerStyle: {
            backgroundColor: THEME.colors.primary,
          },
          headerTintColor: THEME.colors.light,
          headerTitle: "Configurar Gateway",
        }}
      />
      <Screen
        component={QRCodeScanner}
        name="QRCodeScanner"
        options={{
          headerBackImage: () => (
            <Entypo color={THEME.colors.light} name="chevron-left" size={28} />
          ),
          headerStyle: {
            backgroundColor: THEME.colors.primary,
          },
          headerTintColor: THEME.colors.light,
          headerTitle: "Leitor de QR Code",
        }}
      />
      <Screen
        component={ConfigureParameters}
        name="ConfigureParameters"
        options={{
          headerTitle: "Configurar Parâmetros",
          headerTitleAlign: "center",
        }}
      />
      <Screen
        component={ConfigureGateway}
        name="ConfigureGateway"
        options={{
          headerTitle: "Configurar Gateway",
          headerTitleAlign: "center",
        }}
      />
      {/* <Screen
        component={BluetoothManager}
        name="BluetoothManager"
        options={{
          headerBackImage: () => (
            <Entypo color={THEME.colors.light} name="chevron-left" size={28} />
          ),
          headerStyle: {
            backgroundColor: THEME.colors.primary,
          },
          headerTintColor: THEME.colors.light,
          headerTitle: "Gerenciador Bluetooth",
        }}
      /> */}
      <Screen
        component={Notifications}
        name="Notifications"
        options={{
          title: "Notificações",
        }}
      />
      <Screen
        component={AssetDetails}
        name="AssetDetails"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={EditAssetDetails}
        name="EditAssetDetails"
        options={{
          headerTitle: t('index.pieceDetails'),
        }}
      />
      <Screen
        component={MeasurementPointDetails}
        name="MeasurementPointDetails"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={Device}
        name="Device"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={DeviceGateway}
        name="DeviceGateway"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={MeasurementHistory}
        name="MeasurementHistory"
        options={{
          title: t('index.diagnosesHistory'),
        }}
      />
      <Screen
        component={NotificationDetails}
        name="NotificationDetails"
        options={{
          title: "Detalhes notificação",
        }}
      />
      <Screen
        component={Manuals}
        name="Manuals"
        options={{
          title: t('index.accessManuals'),
        }}
      />
      <Screen
        component={MyData}
        name="MyData"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={Languages}
        name="Languages"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={Countries}
        name="Countries"
        options={{
          headerShown: false,
        }}
      />
      <Screen
        component={AlertDetails}
        name="AlertDetails"
        options={{
          title: "Detalhes alerta",
          headerShown: false,
        }}
      />
      <Screen
        component={AlertPrescriptionDetails}
        name="AlertPrescriptionDetails"
        options={{
          title: "Prescrição",
          headerShown: false,
        }}
      />
      <Screen
        component={DiagnosesByPiece}
        name="DiagnosesByPiece"
        options={{
          title: "Diagnósticos",
        }}
      />
    </Navigator>
  );
}
