import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OneSignal } from "react-native-onesignal";
import { useTheme } from "styled-components/native";

import TuneIcon from "../../assets/icons/tune.svg";

import { Loading } from "../../components/Loading";
import { NotificationCard } from "../../components/NotificationCard";

import { useAuth } from "../../hooks/useAuth";

import api from "../../services/api";
import { SessionsResponse } from "../../services/Auth/types";
import { getAllNotifications } from "../../services/Notifications";
import {
  GetAllNotificationsResponse,
  GetNotificationByIDResponse,
} from "../../services/Notifications/types";

import {
  Container,
  TuneIconContainer,
  List,
  Content,
  Text,
  Footer,
  Pressable,
  FooterText,
} from "./styles";

export function Notifications() {
  const THEME = useTheme();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [allNotifications, setAllNotifications] = useState<
    GetNotificationByIDResponse[]
  >([]);
  const [showReadNotifications, setShowReadNotifications] = useState(false);

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
        const { notifications } = response.data as GetAllNotificationsResponse;

        setAllNotifications(notifications);
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
      <TuneIconContainer>
        <TuneIcon height={18} width={18} />
      </TuneIconContainer>

      <List
        data={
          !showReadNotifications
            ? allNotifications.filter((notification) => !notification.read)
            : allNotifications
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationCard {...item} />}
        ListEmptyComponent={
          <Content>
            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Nenhuma notificação para visualizar.
            </Text>
          </Content>
        }
      />

      <Footer>
        <Pressable
          onPress={() => setShowReadNotifications(!showReadNotifications)}
        >
          <FooterText>
            {showReadNotifications
              ? "Ocultar notificações lidas"
              : "Exibir notificações lidas"}
          </FooterText>
        </Pressable>
      </Footer>
    </Container>
  );
}
