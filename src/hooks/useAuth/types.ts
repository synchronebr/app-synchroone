import { ReactNode } from "react";
import { AxiosResponse } from "axios";

import { SessionsRequest, User } from "../../services/Auth/types";

export type AuthProviderProps = {
  children: ReactNode;
};

export type IAuthContextData = {
  AUTH_TOKEN_STORAGE_KEY: string;
  REFRESH_TOKEN_STORAGE_KEY: string;
  USER_STORAGE_KEY: string;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login(form: SessionsRequest): Promise<AxiosResponse<any, any>>;
  logout(): Promise<void>;
  updateUser: () => void;
  deleteRegister(): Promise<void>;
};
