
import React from "react";

import { PodcastIcon, SquareActivityIcon, ChartBarBigIcon } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";

import THEME from "../../global/styles/theme";
import { EmptyStateProps } from "./types";
import theme from "../../global/styles/theme";

export default function EmptyState<T>({ 
  icon,
  title,
  description,
 }: EmptyStateProps<T>) {
  return (
    <View style={styles.container}>
      {icon ? (
        <>
        {icon === "SquareActivity" && (<SquareActivityIcon size={40} color={theme.colors.gray_dark}/>)}
        {icon === "ChartBarBigIcon" && (<ChartBarBigIcon size={40} color={theme.colors.gray_dark}/>)}
        </>
      ) : (
        <PodcastIcon size={40} color={theme.colors.gray_dark} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{description}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  title: {
    color: theme.colors.primary,
  },
  subtitle: {
    color: theme.colors.gray_dark,
    fontSize: theme.fontSize.smaller,
  }
});