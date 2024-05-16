import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "../screens/Login";

export function Auth() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen component={Login} name="Login" />
    </Navigator>
  );
}
