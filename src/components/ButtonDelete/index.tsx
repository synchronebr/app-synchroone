import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

import { ButtonProps } from "./types";
import { Container, Title } from "./styles";

export function ButtonDelete({ loading, title, ...rest }: ButtonProps) {
  const THEME = useTheme();

  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator color={THEME.colors.light} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
