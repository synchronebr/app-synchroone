import { Entypo } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { DashboardTab } from "./dashboard-tab";
import { AssetDetails } from "../screens/AssetDetails";
import { MeasurementPointDetails } from "../screens/MeasurementPointDetails";
import { MeasurementHistory } from "../screens/MeasurementHistory";
import { NotificationDetails } from "../screens/NotificationDetails";
import { Manuals } from "../screens/Manuals";

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
          fontSize: THEME.fontSize.normal,
          lineHeight: RFValue(24),
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
        component={AssetDetails}
        name="AssetDetails"
        options={{
          headerShown: false,
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
        component={MeasurementHistory}
        name="MeasurementHistory"
        options={{
          title: "Histórico de medições",
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
          title: "Acessar Manuais",
        }}
      />
    </Navigator>
  );
}
