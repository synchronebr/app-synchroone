import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { ThemeProvider } from "styled-components/native";

import THEME from "./src/global/styles/theme";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider theme={THEME}>
      <View style={styles.container}>
        <Text style={styles.text}>Synchrone</Text>
        <StatusBar backgroundColor={THEME.colors.primary} barStyle="default" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: THEME.colors.primary,
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: THEME.colors.light,
    fontFamily: THEME.fonts.semiBold,
    fontSize: THEME.fontSize.largest,
  },
});
