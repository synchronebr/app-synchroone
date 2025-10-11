import api from "../api";

interface IGetHomeScreen {
  companyId: number;
  startDate: Date;
  endDate: Date;
  type: string;
}

export async function getHomeScreen({ companyId, startDate, endDate, type }: IGetHomeScreen) {
  const response = await api.get(`screens/mobiles/home/companies/${companyId}`, { params: {
    startDate, 
    endDate, 
    type,
  }});
  return response;
}