import React from "react";
import { View, StyleSheet, Dimensions, Modal } from "react-native";

import { DrawerProps } from "./types";

export default function Drawer({ children, isOpen, height = "auto" }: DrawerProps) {
  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={{
            ...styles.modal,
            height,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modal: {
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    width: "90%",
    maxWidth: Dimensions.get("window").width * 0.9,
    maxHeight: Dimensions.get("window").height * 0.95,
  },
});
