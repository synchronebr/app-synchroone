import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Text, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Rive, { Fit, Alignment } from "rive-react-native";

export function Nearby() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Searching" as never);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <Rive
        resourceName="nearby"
        fit={Fit.Contain}
        alignment={Alignment.Center}
        style={styles.animation}
        autoplay
        {...(Platform.OS === "android" && { useSoftwareRenderer: true })}
      />
      <Text style={styles.title}>Buscando gateway...</Text>
      <Text style={styles.subtitle}>Toque para procurar dispositivos</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#CBD5E1",
    marginBottom: 100,
    textAlign: "center",
  },
  animation: {
    width: 400,
    height: 400,
  },
});
