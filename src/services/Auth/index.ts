import api from "../api";

import { CreateRequest, SessionsRequest } from "./types";

export async function create(request: CreateRequest) {
  const response = await api.post("users", request);

  return response;
}

export async function sessions(request: SessionsRequest) {
  const response = await api.post("sessions", request);

  return response;
}
