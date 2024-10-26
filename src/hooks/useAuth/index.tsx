import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { sessions, deleteUser } from "../../services/Auth";
import {
  SessionsRequest,
  SessionsResponse,
  User,
} from "../../services/Auth/types";

import { AuthProviderProps, IAuthContextData } from "./types";

const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

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

  async function logout() {
    await AsyncStorage.clear();
    setUser({} as User);
  }

  async function deleteRegister() {
    // await deleteUser(user.id);
    console.log('delete...');
  }

  return (
    <AuthContext.Provider
      value={{
        AUTH_TOKEN_STORAGE_KEY,
        USER_STORAGE_KEY,
        user,
        setUser,
        login,
        logout,
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
