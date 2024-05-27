import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import ArrowBackIcon from "../assets/icons/arrow-back.svg";

import { DashboardTab } from "./dashboard-tab";
import { AssetDetails } from "../screens/AssetDetails";
import { NotificationDetails } from "../screens/NotificationDetails";
import { Manuals } from "../screens/Manuals";

export function Dashboard() {
  const { Navigator, Screen } = createStackNavigator();

  const THEME = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: THEME.colors.light,
          elevation: null,
        },
        headerBackImage: () => (
          <ArrowBackIcon
            style={{ marginLeft: 8 }}
            height={RFValue(16)}
            width={RFValue(10)}
          />
        ),
        headerTintColor: THEME.colors.primary,
        headerTitleStyle: {
          fontFamily: THEME.fonts.semiBold,
          fontSize: THEME.fontSize.larger,
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
