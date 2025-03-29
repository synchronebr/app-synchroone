import api from "../api";
import { IPiece } from "../dtos/IPiece";

import { EquipmentsResponse } from "./types";

type EquipmentsFilters = {
  companyId: number
  areaId?: number
  machineId?: number
  sectorId?: number
  unitId?: number
  responsibleId?: number
  search?: string
}

export async function getEquipments(filters: EquipmentsFilters): Promise<EquipmentsResponse | any> {
  let response = await api.get<EquipmentsResponse>("screens/mobiles/equipments", {
    params: filters
  });

  if (!response.data || !response.data.total) {
    response.data.data.items = []
    response.data.total = 0
  }

  return response;
}

export async function getEquipmentById(id: number): Promise<IPiece | any> {
  let response = await api.get<IPiece>(`screens/mobiles/equipments/${id}`);
  return response?.data;
}

export async function updateEquipmentFavoriteStatus(id: number, toFavorite: boolean): Promise<void> {
  try {
    await api.post(`/screens/mobiles/equipments/${id}/${toFavorite ? 'favorite' : 'unfavorite'}`);
  } catch (_) {}
}
