import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

interface ILoading {
  bgColor?: string;
  color?: string;
}

export function Loading({ bgColor, color }: ILoading) {
  const THEME = useTheme();

  return (
    <Container bgColor={bgColor}>
      <ActivityIndicator color={color ? color : THEME.colors.light} size="large" />
    </Container>
  );
}
