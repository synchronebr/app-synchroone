import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { OneSignal } from "react-native-onesignal";
import * as Notifications from "expo-notifications";

import Logo from "../../assets/icons/logo.svg";

import { useAuth } from "../../hooks/useAuth";

import api from "../../services/api";
import { SessionsResponse } from "../../services/Auth/types";

import { Container, Content } from "./styles";

export function Splash() {
  const navigation = useNavigation();
  const THEME = useTheme();

  const {
    AUTH_TOKEN_STORAGE_KEY,
    REFRESH_TOKEN_STORAGE_KEY,
    USER_STORAGE_KEY,
    setUser,
    logout,
  } = useAuth();

  function createAPIInterceptors() {
    api.interceptors.request.use(
      async (config) => {
        const authToken = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

        if (authToken)
          config.headers.Authorization = `Bearer ${authToken.replace(
            /"/g,
            ""
          )}`;

        return config;
      },
      async function (error) {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error(error);

        if (error.response.status === 401) {
          if (error.response.data.code === "token.expired") {
            const currentAuthToken = await AsyncStorage.getItem(
              AUTH_TOKEN_STORAGE_KEY
            );
            const currentRefreshToken = await AsyncStorage.getItem(
              REFRESH_TOKEN_STORAGE_KEY
            );

            if (currentAuthToken && currentRefreshToken) {
              try {
                const response = await api.post("sessions/refreshToken", {
                  refreshToken: JSON.parse(currentRefreshToken),
                });

                if (response.status === 200) {
                  const data: SessionsResponse = response.data;

                  await AsyncStorage.setItem(
                    AUTH_TOKEN_STORAGE_KEY,
                    JSON.stringify(data.token)
                  );
                  await AsyncStorage.setItem(
                    REFRESH_TOKEN_STORAGE_KEY,
                    JSON.stringify(data.refreshToken)
                  );
                  await AsyncStorage.setItem(
                    USER_STORAGE_KEY,
                    JSON.stringify(data.user)
                  );
                }

                return api.request(error.config);
              } catch (error) {
                await logout();

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Auth" as never }],
                });

                return;
              }
            }
          }

          // redirects user to login page

          // Perform navigation reset to Auth stack, preventing back navigation
          // navigationRef.current?.reset({
          //   index: 0,
          //   routes: [{ name: "Auth", params: { screen: "Login" } }],
          // });

          return;
        }

        return Promise.reject(error);
      }
    );
  }

  async function getToken() {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);

    if (token && userData) {
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

  function initializeOneSignal() {
    OneSignal.initialize("5f7e98d9-9cca-4e86-8aaa-3de1e8fa36d7");
  }

  async function requestPushNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      requestPushNotificationPermissions();
    }
  }

  useEffect(() => {
    createAPIInterceptors();
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    initializeOneSignal();
    requestPushNotificationPermissions();
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
