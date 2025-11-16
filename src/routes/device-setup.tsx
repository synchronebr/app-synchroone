import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

import { DeviceConfigStart } from "../screens/DeviceSetup/DeviceConfigStart";
import { DeviceSetupChooseType } from "../screens/DeviceSetup/DeviceSetupChooseType";
import { DeviceSetupOptionConfig } from "../screens/DeviceSetup/DeviceSetupOptionConfig";
import { DeviceSetupNearbySensors } from "../screens/DeviceSetup/DeviceSetupNearbySensors";
import { DeviceSetupStartPairingProtocol } from "../screens/DeviceSetup/DeviceSetupStartPairingProtocol";

export type SensorSetupParamList = {
  DeviceConfigStart: undefined;
  DeviceSetupChooseType: undefined;
  DeviceSetupOptionConfig: undefined;
  DeviceSetupNearbySensors: undefined;
  DeviceSetupStartPairingProtocol: undefined;
};

export function DeviceSetupStack() {
  const { Navigator, Screen, Group } = createStackNavigator<SensorSetupParamList>();
  const THEME = useTheme();

  const headerPrimary = {
    headerBackImage: () => (
      <Entypo color={THEME.colors.light} name="chevron-left" size={28} />
    ),
    headerStyle: { backgroundColor: THEME.colors.primary },
    headerTintColor: THEME.colors.light,
  };

  return (
    <Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Group screenOptions={headerPrimary}>
        <Screen
          name="DeviceConfigStart"
          component={DeviceConfigStart}
          options={{ 
            title: "Configurar Sensor",
            headerShown: false,
          }}
        />
        <Screen
          name="DeviceSetupChooseType"
          component={DeviceSetupChooseType}
          options={{ 
            title: "Configurar Sensor",
            headerShown: false,
          }}
        />
        <Screen
          name="DeviceSetupOptionConfig"
          component={DeviceSetupOptionConfig}
          options={{ 
            title: "Configurar Sensor",
            headerShown: false,
          }}
        />
        <Screen
          name="DeviceSetupNearbySensors"
          component={DeviceSetupNearbySensors}
          options={{ 
            title: "Configurar Sensor",
            headerShown: false,
          }}
        />
        <Screen
          name="DeviceSetupStartPairingProtocol"
          component={DeviceSetupStartPairingProtocol}
          options={{ 
            title: "Configurar Sensor",
            headerShown: false,
          }}
        />
      </Group>
    </Navigator>
  );
}
