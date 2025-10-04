import { createContext, useContext, useEffect, useState } from "react";
import { OneSignal } from "react-native-onesignal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import { sessions, deleteUser } from "../../services/Auth";
import {
  SessionsRequest,
  SessionsResponse,
  User,
} from "../../services/Auth/types";

import { AuthProviderProps, IAuthContextData } from "./types";
import api, { setupApi } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  function initializeOneSignal() {
    OneSignal.initialize("5f7e98d9-9cca-4e86-8aaa-3de1e8fa36d7");

    OneSignal.Notifications.addEventListener("click", (event) => {
      console.log("Notification clicked:", event);
    });
  }

  async function requestPushNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      requestPushNotificationPermissions();
    }
  }

  useEffect(() => {
    initializeOneSignal();
    requestPushNotificationPermissions();
    setupApi();
  }, [])

  const AUTH_TOKEN_STORAGE_KEY = "@synchroone:auth_token";
  const REFRESH_TOKEN_STORAGE_KEY = "@synchroone:refresh_token";
  const USER_STORAGE_KEY = "@synchroone:user";

  async function login(form: SessionsRequest) {
    const { email, password } = form;

    const request: SessionsRequest = {
      email,
      password,
    };

    const response = await sessions(request);
    const data = response.data as SessionsResponse;

    if (response.status === 200) {
      const { refreshToken, token, user } = data;

      OneSignal.login(user.email);

      await AsyncStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token));
      await AsyncStorage.setItem(
        REFRESH_TOKEN_STORAGE_KEY,
        JSON.stringify(refreshToken)
      );
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      setUser(user);
    }

    return response;
  }

  async function updateUser() {
    try {
      const response = await api.get("me");
      const { user, accessLevels } = response.data;

      setUser({
        ...user,
        userAcess: accessLevels,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      // signOut();
    }
  }

  async function logout() {
    await AsyncStorage.clear();
    setUser({} as User);
  }

  async function deleteRegister() {
    // await deleteUser(user.id);
    console.log("delete...");
  }

  return (
    <AuthContext.Provider
      value={{
        AUTH_TOKEN_STORAGE_KEY,
        REFRESH_TOKEN_STORAGE_KEY,
        USER_STORAGE_KEY,
        user,
        setUser,
        login,
        logout,
        updateUser,
        deleteRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
