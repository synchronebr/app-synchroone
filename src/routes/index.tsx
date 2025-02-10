import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Splash } from "../screens/Splash";
import { Auth } from "./auth";
import { DashboardDrawer } from "./dashboard-drawer";

export function Routes() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen component={Splash} name="Splash" />
        <Screen component={Auth} name="Auth" />
        <Screen component={DashboardDrawer} name="DashboardDrawer" />
      </Navigator>
    </NavigationContainer>
  );
}
