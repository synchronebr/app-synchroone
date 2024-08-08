import api from "../../../../../api";

// import { CompaniesResponse } from "./types";

export async function getPiecesForSelect(companyId: number, areaId: number, sectorId: number, machineId: number): Promise<{ label: string, value: string }[] | any> {
  let response = await api.get(`companies/${companyId}/areas/${areaId}/sectors/${sectorId}/machines/${machineId}/pieces`);

  let items = [{ label: "Selecione um ativo", value: null }];
  if (response.data) {
    response.data.map(item => items.push({ label: item.description, value: item.id }))
  }

  return items;
}
