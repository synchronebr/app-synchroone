import api from "../../../api";

// import { CompaniesResponse } from "./types";

export async function getSectorsForSelect(companyId: number, areaId: number): Promise<{ label: string, value: string }[] | any> {
  let response = await api.get(`companies/${companyId}/areas/${areaId}/sectors`);

  let items = [];
  if (response.data) {
    response.data.map(item => items.push({ label: item.name, value: item.id }))
  }

  return items;
}
