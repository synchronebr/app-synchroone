import api from "../../api";

// import { CompaniesResponse } from "./types";

export async function getPiecesForSelect(companyId: number, pathId?: number): Promise<{ label: string, value: string }[] | any> {
  let params = {} as any;
  if (companyId) params.companyId = companyId;
  if (pathId) params.pathId = pathId;
  let response = await api.get(`assets`, {
    params,
  });

  let items = [];
  if (response.data) {
    response.data.map(item => items.push({ label: item.description, value: item.id }))
  }

  return items;
}
