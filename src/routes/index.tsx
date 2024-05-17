import { NavigationContainer } from "@react-navigation/native";

import { Auth } from "./auth";
import { DashboardTab } from "./dashboard-tab";

export function Routes() {
  return (
    <NavigationContainer>
      <DashboardTab />
    </NavigationContainer>
  );
}
