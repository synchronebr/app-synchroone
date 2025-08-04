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

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  refreshToken: string;
  isAdmin?: boolean;
};
