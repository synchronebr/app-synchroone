import api from "../api";
import { IMeasuringPoint } from "../dtos/IMeasuringPoint";

export async function getMeasuringPointById(equipmentId: number, id: number): Promise<IMeasuringPoint | any> {
  let response = await api.get<IMeasuringPoint>(`screens/mobiles/equipments/${equipmentId}/measuring-points/${id}`);
  return response?.data;
}
