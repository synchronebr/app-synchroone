import axios, { AxiosError, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { SessionsResponse } from "../services/Auth/types";

export const AUTH_TOKEN_STORAGE_KEY = "@synchroone:auth_token";
export const REFRESH_TOKEN_STORAGE_KEY = "@synchroone:refresh_token";
export const USER_STORAGE_KEY = "@synchroone:user";

type SetupOptions = {
  // callback opcional para tomar ação global quando refresh falhar (ex: logout + reset nav)
  onUnauthorized?: () => Promise<void> | void;
};

const api = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ||
    /*"http://192.168.4.5:3333/"*/ "https://api.synchroone.com/",
    // "http://192.168.6.4:3333/",
});

export default api;

// ---------- Interceptors (registrar uma única vez) ----------
let isSetup = false;
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}> = [];

/**
 * Registra interceptors só uma vez.
 * Chame `setupApi()` UMA vez no bootstrap do app (ex: App.tsx).
 */
export function setupApi(options?: SetupOptions) {
  if (isSetup) return;
  isSetup = true;

  // ---- Request: adiciona Authorization se houver token salvo
  api.interceptors.request.use(
    async (config) => {
      const tokenStr = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
      if (tokenStr) {
        const token = JSON.parse(tokenStr);
        config.headers = {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ---- Response: tenta refresh se for 401 + token expirado
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
      const status = error.response?.status;
      const code = (error.response?.data as any)?.code;
      const originalConfig: any = error.config || {};

      // 1) Só tentamos refresh se:
      //    - 401
      //    - code === "token.expired"
      //    - ainda não tentamos (_retry evita loop)
      if (
        status === 401 &&
        code === "token.expired" &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        // Se já tem refresh em curso, fila a request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject, config: originalConfig });
          });
        }

        isRefreshing = true;

        try {
          const refreshTokenStr = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
          if (!refreshTokenStr) throw error;

          const refreshToken = JSON.parse(refreshTokenStr);

          // Importante: usar a MESMA instância `api` aqui mantém baseURL/headers etc.
          const { status: rtStatus, data } = await api.post("sessions/refreshToken", { refreshToken });

          if (rtStatus !== 200) throw error;

          const { token, refreshToken: newRefreshToken, user } = data as SessionsResponse;

          await AsyncStorage.multiSet([
            [AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token)],
            [REFRESH_TOKEN_STORAGE_KEY, JSON.stringify(newRefreshToken)],
            [USER_STORAGE_KEY, JSON.stringify(user)],
          ]);

          // Atualiza header default para novas requests
          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          // Reenvia a original com o token novo
          originalConfig.headers = {
            ...(originalConfig.headers || {}),
            Authorization: `Bearer ${token}`,
          };

          // Desfila todas as pendentes
          const replay = api.request(originalConfig);
          failedQueue.forEach(({ resolve, config }) => {
            resolve(
              api.request({
                ...config,
                headers: {
                  ...(config.headers || {}),
                  Authorization: `Bearer ${token}`,
                },
              })
            );
          });
          failedQueue = [];

          return replay;
        } catch (refreshErr) {
          // Falhou o refresh: rejeita tudo que estava na fila
          failedQueue.forEach(({ reject }) => reject(refreshErr));
          failedQueue = [];

          // Limpa storage e dispara callback global (ex: logout)
          await AsyncStorage.multiRemove([
            AUTH_TOKEN_STORAGE_KEY,
            REFRESH_TOKEN_STORAGE_KEY,
            USER_STORAGE_KEY,
          ]);

          if (options?.onUnauthorized) {
            try { await options.onUnauthorized(); } catch {}
          }

          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }

      // 2) Qualquer outro erro (ex: 400, 404, 500...) -> NÃO tem retry automático
      return Promise.reject(error);
    }
  );
}
