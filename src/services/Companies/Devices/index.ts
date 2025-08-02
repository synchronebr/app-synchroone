import api from "../../api";

// import { CompaniesResponse } from "./types";

interface IDevice {
    deviceCode: string;
    companyId: number;
    status: string;
    createdAt: Date;
    apn: string;
    apnUser: string;
    apnPass: string;
}

export async function getDevicesById(
  companyId: number,
  deviceCode: string
): Promise<IDevice | any> {
  let response = await api.get(
    `companies/${companyId}/devices/${deviceCode}`
  );

  return response.data;
}

