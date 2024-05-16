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

import { TabBarCenterButton } from "../components/TabBarCenterButton";

import { Home } from "../screens/Home";
import { Assets } from "../screens/Assets";
import { Analyses } from "../screens/Analyses";
import { Notifications } from "../screens/Notifications";
import { More } from "../screens/More";

export function Dashboard() {
  const { Navigator, Screen } = createBottomTabNavigator();

  const THEME = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
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
          tabBarIcon: ({ focused }) =>
            focused ? <HomeSolidIcon /> : <HomeOutlineIcon />,
          title: "Início",
        }}
      />
      <Screen
        component={Assets}
        name="Assets"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <WaterPumpIcon /> : <WaterPumpOutlineIcon />,
          title: "Ativos",
        }}
      />
      <Screen
        component={Notifications}
        name="Notifications"
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <TabBarCenterButton />,
        }}
      />
      <Screen
        component={Analyses}
        name="Analyses"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ChartPieFilledIcon /> : <ChartPieIcon />,
          title: "Análises",
        }}
      />
      <Screen
        component={More}
        name="More"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SettingsBoldIcon /> : <SettingsLinearIcon />,
          title: "Mais",
        }}
      />
    </Navigator>
  );
}
