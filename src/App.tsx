import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from "expo-navigation-bar";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { ThemeProvider } from "styled-components/native";
import { ToastProvider } from "react-native-toast-notifications";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import './utils/translations/i18n';

import THEME from "./global/styles/theme";

import { AuthProvider } from "./hooks/useAuth";
import { AccessLevelsProvider } from "./hooks/useAccessLevels";
import { BLEManagerProvider } from "./hooks/useBLEManager";

import { Routes } from "./routes";
import { setupApi } from "./services/api";

const queryClient = new QueryClient();

export default function App() {
  if (Platform.OS === "android")
    NavigationBar.setBackgroundColorAsync(THEME.colors.primary);

  let [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  LogBox.ignoreAllLogs();

  return (
    <ThemeProvider theme={THEME}>
      <ToastProvider
        animationDuration={100}
        animationType="zoom-in"
        duration={3500}
        placement="top"
        offset={50}
        textStyle={{
          fontSize: 12,
          fontFamily: THEME.fonts.medium,
          textAlign: "center",
        }}
        dangerColor={THEME.colors.danger}
        successColor={THEME.colors.success}
        warningColor={THEME.colors.warning}
      >
        <AuthProvider>
          <AccessLevelsProvider>
            <QueryClientProvider client={queryClient}>
              <StatusBar
                backgroundColor={THEME.colors.primary}
                barStyle="light-content"
              />
              <BLEManagerProvider>
                <SafeAreaView style={styles.safeArea}>
                  <Routes />
                </SafeAreaView>
              </BLEManagerProvider>
            </QueryClientProvider>
          </AccessLevelsProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: THEME.colors.primary,
    flex: 1,
  },
});
