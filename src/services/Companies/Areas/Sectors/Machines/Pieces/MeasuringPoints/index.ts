import api from "../../../../../../api";

// import { CompaniesResponse } from "./types";

export async function getMeasuringPointsForSelect(companyId: number, areaId: number, sectorId: number, machineId: number, pieceId: number): Promise<{ label: string, value: string }[] | any> {
  let response = await api.get(`companies/${companyId}/areas/${areaId}/sectors/${sectorId}/machines/${machineId}/pieces/${pieceId}/measuringPoints`);

  let items = [{ label: "Selecione um ponto de medição", value: null }];
  if (response.data) {
    response.data.map(item => items.push({ label: item.name, value: item.id }))
  }

  return items;
}
