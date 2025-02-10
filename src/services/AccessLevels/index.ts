import api from "../api";
import { UpdateCurrentCompanyRequest } from "./types";

export async function getAccessLevels() {
  const response = await api.get("me");

  return response;
}

export async function updateCurrentCompany(
  request: UpdateCurrentCompanyRequest
) {
  const response = await api.put("me", request);

  return response;
}
