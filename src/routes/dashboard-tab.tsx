import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

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
import { Notifications } from "../screens/Notifications";
import { More } from "../screens/More";

export function DashboardTab() {
  const { Navigator, Screen } = createBottomTabNavigator();

  const THEME = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: THEME.colors.light,
          elevation: null,
        },
        headerTintColor: THEME.colors.primary,
        headerTitleStyle: {
          fontFamily: THEME.fonts.semiBold,
          fontSize: THEME.fontSize.larger,
          lineHeight: RFValue(24),
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
          height: RFValue(62),
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
        component={Notifications}
        name="Notifications"
        options={{
          headerRight: () => <QRCodeButton />,
          headerTitle: "Notificações",
          tabBarLabel: "",
          tabBarIcon: () => <TabBarCenterButton />,
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
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) =>
            focused ? <SettingsBoldIcon /> : <SettingsLinearIcon />,
          title: "Mais",
        }}
      />
    </Navigator>
  );
}
