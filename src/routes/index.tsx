import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Splash } from "../screens/Splash";
import { Auth } from "./auth";
import { DashboardDrawer } from "./dashboard-drawer";
import { AnimationRoutes } from "./animations";

export function Routes() {
  const { Navigator, Screen } = createStackNavigator();

  const linking = {
    prefixes: ["synchroone://"],
    config: {
      screens: {
        DashboardDrawer: {
          path: "dashboard",
          screens: {
            Dashboard: {
              initialRouteName: "DashboardTab",
              screens: {
                Notifications: "notifications",
                NotificationDetails: {
                  path: "notification/:id",
                  parse: {
                    id: (id: string) => Number(id),
                  },
                  stringify: {
                    id: (id: number) => id.toString(),
                  },
                },
                AssetDetails: {
                  path: "asset/:id",
                  parse: {
                    id: (id: string) => Number(id),
                  },
                  stringify: {
                    id: (id: number) => id.toString(),
                  },
                },
                AlertDetails: {
                  path: "diagnose/:id",
                  parse: {
                    id: (id: string) => Number(id),
                  },
                  stringify: {
                    id: (id: number) => id.toString(),
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen component={Splash} name="Splash" />
        <Screen component={Auth} name="Auth" />
        <Screen component={DashboardDrawer} name="DashboardDrawer" />
        <Screen name="Animations" component={AnimationRoutes} />
      </Navigator>
    </NavigationContainer>
  );
}
