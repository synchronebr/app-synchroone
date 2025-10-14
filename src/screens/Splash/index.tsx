import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { useAuth } from "../../hooks/useAuth";

import Logo from "../../assets/icons/logo.svg";
import { Container, Content } from "./styles";
import api from "../../services/api";

export function Splash() {
  const navigation = useNavigation();
  const THEME = useTheme();
  

  const {
    AUTH_TOKEN_STORAGE_KEY,
    REFRESH_TOKEN_STORAGE_KEY,
    USER_STORAGE_KEY,
    setUser,
    getUserDB,
    logout,
  } = useAuth();

  async function verifyAuth() {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);

    if (token && userData) {
      getUserDB();
      setUser(JSON.parse(userData));

      navigation.reset({
        index: 0,
        routes: [{ name: "DashboardDrawer" as never }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" as never }],
      });
    }
  }
  
  useEffect(() => {
    verifyAuth();
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
