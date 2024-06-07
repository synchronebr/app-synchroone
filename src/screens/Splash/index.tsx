import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import Logo from "../../assets/icons/logo.svg";

import { Container, Content } from "./styles";

export function Splash() {
  const navigation = useNavigation();
  const THEME = useTheme();

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" as never }],
      });
    }, 1500);
  }, []);

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
