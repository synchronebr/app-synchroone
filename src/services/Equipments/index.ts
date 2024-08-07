import api from "../api";
import { IPiece } from "../dtos/IPiece";

import { EquipmentsResponse } from "./types";

export async function getEquipments(): Promise<EquipmentsResponse | any> {
  let response = await api.get<EquipmentsResponse>("screens/mobiles/equipments");

  if (!response.data || !response.data.total) {
    response.data.data = []
    response.data.total = 0
  }

  return response;
}

export async function getEquipmentById(id: number): Promise<IPiece | any> {
  let response = await api.get<IPiece>(`screens/mobiles/equipments/${id}`);
  return response?.data;
}
