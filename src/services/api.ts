import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SessionsResponse } from "./Auth/types";

const AUTH_TOKEN_STORAGE_KEY = "@synchroone:auth_token";
const REFRESH_TOKEN_STORAGE_KEY = "@synchroone:refresh_token";
const USER_STORAGE_KEY = "@synchroone:user";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || /*"http://192.168.4.5:3333/"*/"https://api.synchroone.com/",
});

api.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (authToken)
      config.headers.Authorization = `Bearer ${JSON.parse(authToken)}`;

    return config;
  },
  async function(error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error)

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
            return;
          }
        }
      }

      // redirects user to login page
      await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      await AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      await AsyncStorage.removeItem(USER_STORAGE_KEY);

      // Perform navigation reset to Auth stack, preventing back navigation
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: "Auth", params: { screen: "Login" } }],
      });

      return;
    }

    return Promise.reject(error);
  }
);

export default api;
