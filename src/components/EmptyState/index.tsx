
import React from "react";

import { PodcastIcon } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";

import THEME from "../../global/styles/theme";
import { EmptyStateProps } from "./types";
import theme from "../../global/styles/theme";

export default function EmptyState<T>({ 
  title,
  description,
 }: EmptyStateProps<T>) {
  return (
    <View style={styles.container}>
      <PodcastIcon size={40} color={theme.colors.gray}/>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: theme.colors.gray,
  }
});