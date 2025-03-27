import React, { useCallback, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { OneSignal } from "react-native-onesignal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "styled-components/native";

import NotificationsIcon from "../../assets/icons/notifications.svg";
import BlueLogoIcon from "../../assets/icons/blue-logo.svg";
import LogoWhiteIconIcon from "../../assets/icons/logo-white-text.svg";

import { Loading } from "../../components/Loading";
import { TotalNotifications } from "../../components/TotalNotifications";
import { SynchroneSensorButton } from "../../components/SynchroneSensorButton";
import { NewGatewayButton } from "../../components/NewGatewayButton";
import { WhatsAppButton } from "../../components/WhatsAppButton";

import { useAuth } from "../../hooks/useAuth";

import api from "../../services/api";
import { SessionsResponse } from "../../services/Auth/types";
import { getAllNotifications } from "../../services/Notifications";
import { GetAllNotificationsResponse } from "../../services/Notifications/types";

import {
  Container,
  Header,
  Title,
  NotificationsIconContainer,
  GreetingsContainer,
  GreetingsMessage,
  Buttons,
} from "./styles";

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [unreadNotificationsTotal, setUnreadNotificationsTotal] = useState<
    number | null
  >(null);

  const navigation = useNavigation();
  const THEME = useTheme();

  const notificationsIconSize = 22;

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

  async function getNotifications() {
    setIsLoading(true);

    try {
      const response = await getAllNotifications();

      if (response.status === 200) {
        const { quantity } = response.data as GetAllNotificationsResponse;
        setUnreadNotificationsTotal(quantity.unread);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
  }, []);

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [])
  );

  if (isLoading)
    return (
      <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
    );

  return (
    <Container>
      <Header>
        <Entypo
          onPress={() => navigation.openDrawer()}
          name="menu"
          size={24}
          color={THEME.colors.primary}
        />

        <Title>Synchroone</Title>

        <NotificationsIconContainer
          onPress={() => navigation.navigate("Notifications" as never)}
        >
          <NotificationsIcon
            height={notificationsIconSize}
            width={notificationsIconSize}
          />
          {unreadNotificationsTotal && (
            <TotalNotifications total={unreadNotificationsTotal} />
          )}
        </NotificationsIconContainer>
      </Header>

      <GreetingsContainer>
        <BlueLogoIcon width={36} height={68} />
        <GreetingsMessage>Bem-vindo ao Synchroone!</GreetingsMessage>
      </GreetingsContainer>

      <Buttons>
        <SynchroneSensorButton />
        <NewGatewayButton />
      </Buttons>

      <WhatsAppButton />
    </Container>
  );
}
