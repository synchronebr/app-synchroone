import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";

import HomeSolidIcon from "../assets/icons/home-solid.svg";
import HomeOutlineIcon from "../assets/icons/home-outline.svg";
import WaterPumpIcon from "../assets/icons/water-pump.svg";
import WaterPumpOutlineIcon from "../assets/icons/water-pump-outline.svg";
import ChartPieFilledIcon from "../assets/icons/chart-pie-filled.svg";
import ChartPieIcon from "../assets/icons/chart-pie.svg";
import SettingsBoldIcon from "../assets/icons/settings-bold.svg";
import SettingsLinearIcon from "../assets/icons/settings-linear.svg";

import { QRCodeButton } from "../components/QRCodeButton";
import { TabBarCenterButton } from "../components/TabBarCenterButton";

import { Home } from "../screens/Home";
import { Assets } from "../screens/Assets";
import { Analyses } from "../screens/Analyses";
import { AlertsHistory } from "../screens/AlertsHistory";
import { More } from "../screens/More";
import { useState } from "react";
import { AlertFilterProvider } from "../hooks/useAlertFilter";
import Header from "../components/Pages/Header";

export function DashboardTab() {
  const { Navigator, Screen } = createBottomTabNavigator();

  const THEME = useTheme();

  const [readingsCount, setReadingsCount] = useState(0);

  function AlertsWrapper() {
    return <AlertsHistory setReadingsCount={setReadingsCount} />;
  }

  return (
    <AlertFilterProvider>
      <Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: THEME.colors.light,
            elevation: null,
          },
          headerTintColor: THEME.colors.primary,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: THEME.fonts.semiBold,
            fontSize: THEME.fontSize.larger,
            lineHeight: 24,
            marginLeft: 8,
          },
          tabBarActiveTintColor: THEME.colors.primary,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: THEME.colors.gray_dark,
          tabBarItemStyle: {
            paddingVertical: 8,
          },
          tabBarLabelStyle: {
            fontFamily: THEME.fonts.semiBold,
            fontSize: THEME.fontSize.smaller,
          },
          tabBarStyle: {
            height: 62,
            paddingHorizontal: 20,
          },
        }}
      >
        <Screen
          component={Home}
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? <HomeSolidIcon /> : <HomeOutlineIcon />,
            title: "Início",
          }}
        />
        <Screen
          component={Assets}
          name="Assets"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? <WaterPumpIcon /> : <WaterPumpOutlineIcon />,
            title: "Ativos",
          }}
        />
        <Screen
          component={AlertsWrapper}
          name="AlertsHistory"
          options={{
            headerTitle: "Histórico de Alertas",
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <TabBarCenterButton
                isFocused={focused}
                readingsCount={readingsCount}
              />
            ),
          }}
        />
        <Screen
          component={Analyses}
          name="Analyses"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? <ChartPieFilledIcon /> : <ChartPieIcon />,
            title: "Análises",
          }}
        />
        <Screen
          component={More}
          name="More"
          options={{
            headerTitle: "Configurações",
            tabBarIcon: ({ focused }) =>
              focused ? <SettingsBoldIcon /> : <SettingsLinearIcon />,
            title: "Mais",
          }}
        />
      </Navigator>
    </AlertFilterProvider>
  );
}
