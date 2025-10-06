import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import theme from "../../../../global/styles/theme";

import SensorSyncIcon from "../../../assets/icons/sensor-sync1.svg";
import ArrowForwardIcon from "../../../assets/icons/arrow-forward.svg";
import { t } from "i18next";
import Tabs from "../../Tabs";

interface ICardVibrationProps {
  title: string;
  value: string;
  type?: string;
}

export default function CardVibration({ title, value, type }: ICardVibrationProps) {
  const THEME = useTheme();
  return (
    <View style={[styles.container, type === 'T' && styles.temperature]}>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary_light,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    padding: 8,
  },
});
