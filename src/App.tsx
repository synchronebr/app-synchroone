import "react-native-gesture-handler";
import React from "react";
import {LogBox} from 'react-native';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
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
import { RFValue } from "react-native-responsive-fontsize";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import THEME from "./global/styles/theme";

import { AuthProvider } from "./hooks/useAuth";
import { Routes } from "./routes";
import { BLEManagerProvider } from "./hooks/useBLEManager";

const queryClient = new QueryClient()

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
        duration={3500}
        placement="top"
        textStyle={{
          fontFamily: THEME.fonts.medium,
          fontSize: THEME.fontSize.smaller,
          textAlign: "center",
        }}
      >
        <ToastProvider
          animationDuration={100}
          animationType="zoom-in"
          duration={3500}
          placement="top"
          textStyle={{
            fontSize: RFValue(12),
            fontFamily: THEME.fonts.medium,
            textAlign: "center",
          }}
          dangerColor={THEME.colors.danger}
          successColor={THEME.colors.success}
          warningColor={THEME.colors.warning}
        >
          <AuthProvider>
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
          </AuthProvider>
        </ToastProvider>
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
