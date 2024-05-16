import { NavigationContainer } from "@react-navigation/native";

import { Auth } from "./auth";
import { Dashboard } from "./dashboards";

export function Routes() {
  return (
    <NavigationContainer>
      <Dashboard />
    </NavigationContainer>
  );
}
