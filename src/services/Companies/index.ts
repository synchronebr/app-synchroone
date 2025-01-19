import api from "../api";
import { IPiece } from "../dtos/IPiece";

// import { CompaniesResponse } from "./types";

export async function getCompaniesForSelect(): Promise<{ label: string, value: string }[] | any> {
  let response = await api.get("companies");

  let companies = [];
  if (response.data) {
    response.data.data.map(item => companies.push({ label: item.name, value: item.id }))
  }

  return companies;
}
