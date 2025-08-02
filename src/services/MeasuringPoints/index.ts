import api from "../api";
import { IMeasuringPoint } from "../dtos/IMeasuringPoint";
import { IReadings } from "../dtos/IReadings"; // importe o tipo correto

export async function getMeasuringPointById(equipmentId: number, id: number): Promise<IMeasuringPoint | any> {
  let response = await api.get<IMeasuringPoint>(`screens/mobiles/equipments/${equipmentId}/measuring-points/${id}`);
  return response?.data;
}


export async function getReadingsByMeasuringPoint(
  measuringPointId: number,
  params: {
    startDate?: string;
    endDate?: string;
    type?: string;
    withoutInvalids?: boolean;
  }
): Promise<IReadings> {
  const response = await api.get<IReadings>(
    `/readings/measuringPoints/${measuringPointId}/measurings`,
    { params }
  );

  return response.data;
}