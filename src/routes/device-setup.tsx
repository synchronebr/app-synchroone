import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

import { NewDevice1 } from "../screens/NewDevice1";
import { NewDevice2 } from "../screens/NewDevice2";

export type SensorSetupParamList = {
  NewDevice1: undefined;
  NewDevice2: undefined;
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
          name="NewDevice1"
          component={NewDevice1}
          options={{ 
            title: "Configurar Sensor",
            headerShown: false,
          }}
        />
        <Screen
          name="NewDevice2"
          component={NewDevice2}
          options={{ 
            title: "Configurar Sensor",
            headerShown: false,
          }}
        />
      </Group>
    </Navigator>
  );
}
