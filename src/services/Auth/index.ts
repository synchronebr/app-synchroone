import api from "../api";

import { CreateRequest, SessionsRequest, RequestUserRequest } from "./types";

export async function create(request: CreateRequest) {
  const response = await api.post("users", request);

  return response;
}

export async function sessions(request: SessionsRequest) {
  const response = await api.post("sessions", request);

  return response;
}

export async function requestUser(request: RequestUserRequest) {
  const response = await api.post("users/requests", request);

  return response;
}

export async function deleteUser(userId: number) {
  const response = await api.delete(`users/${userId}`);

  return response;
}
