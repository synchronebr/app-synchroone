import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { ButtonProps } from "./types";
import { Container, Title } from "./styles";

export function Button({ loading, title, variant = "primary", ...rest }: ButtonProps) {
  const THEME = useTheme();

  return (
    <Container variant={variant} {...rest}>
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? THEME.colors.secondary : THEME.colors.light}
        />
      ) : (
        <Title variant={variant}>{title}</Title>
      )}
    </Container>
  );
}
