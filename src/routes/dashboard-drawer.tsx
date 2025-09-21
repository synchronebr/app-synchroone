import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Dashboard } from "./dashboard";
import { CustomDrawer } from "../components/CustomDrawer";

import THEME from "../global/styles/theme";

export function DashboardDrawer() {
  const { Navigator, Screen } = createDrawerNavigator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: THEME.colors.primary,
          drawerActiveTintColor: THEME.colors.light,
          drawerStyle: {
            backgroundColor: THEME.colors.light,
            width: "70%",
          },
          drawerInactiveTintColor: THEME.colors.light,
          drawerLabelStyle: {
            fontFamily: THEME.fonts.medium,
            fontSize: THEME.fontSize.normal,
          },
          drawerType: "slide",
          headerRightContainerStyle: {
            paddingRight: 24,
          },
          headerShown: false,
        }}
      >
        <Screen
          component={Dashboard}
          name="Dashboard"
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: THEME.colors.primary,
    flex: 1,
  },
});
