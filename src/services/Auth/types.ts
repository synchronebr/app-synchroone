export type CreateRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type CreateResponse = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type SessionsRequest = {
  email: string;
  password: string;
};

export type SessionsResponse = {
  user: User;
  token: string;
  refreshToken: string;
};

export type RequestUserRequest = {
  email: string;
};

export type UserPreferences = {
  code: string;
  field: string;
  name: string;
  content: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  refreshToken: string;
  country: string;
  locale: string;
  isAdmin?: boolean;
  avatar?: string;
  preferences?: UserPreferences[]
};
