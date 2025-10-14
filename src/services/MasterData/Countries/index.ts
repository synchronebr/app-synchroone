import api from "../../api";

interface ICountry {
  value: string;
  label: string;
}

export async function getCountries() {
  const response = await api.get<ICountry[]>(`admins/selectMasterData/countries`);
  return response;
}