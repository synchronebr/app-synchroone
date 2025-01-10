import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

export function Auth() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen component={Login} name="Login" />
      <Screen component={Register} name="Register" />
    </Navigator>
  );
}
