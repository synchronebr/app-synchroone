import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

import Logo from "../../assets/icons/logo.svg";

import { Container, Content } from "./styles";

export function Splash() {
  const THEME = useTheme();

  return (
    <Container>
      <Content>
        <Logo fill={THEME.colors.light} />
      </Content>

      <ActivityIndicator
        style={{
          marginBottom: 16,
        }}
        color={THEME.colors.light}
        size="large"
      />
    </Container>
  );
}
