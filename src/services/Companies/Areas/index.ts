import api from "../../api";

// import { CompaniesResponse } from "./types";

export async function getAreasForSelect(companyId: number): Promise<{ label: string, value: string }[] | any> {
  let response = await api.get(`companies/${companyId}/areas`);

  let items = [{ label: "Selecione uma area", value: null }];
  if (response.data) {
    response.data.map(item => items.push({ label: item.name, value: item.id }))
  }

  return items;
}
