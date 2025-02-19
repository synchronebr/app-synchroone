import api from "../../../../../../api";

// import { CompaniesResponse } from "./types";

export async function getMeasuringPointsForSelect(
  companyId: number,
  areaId: number,
  sectorId: number,
  machineId: number,
  pieceId: number
): Promise<{ label: string; value: string }[] | any> {
  let response = await api.get(
    `companies/${companyId}/areas/${areaId}/sectors/${sectorId}/machines/${machineId}/pieces/${pieceId}/measuringPoints`,
    {
      params: {
        notSetUp: true,
      }
    }
  );

  let items = [];
  if (response.data) {
    response.data.map((item) =>
      items.push({ label: item.name, value: item.id })
    );
  }

  return items;
}

export async function updatePieceImage(
  companyId: number,
  areaId: number,
  sectorId: number,
  machineId: number,
  pieceId: number,
  formData: FormData
) {
  return await api.put(
    `companies/${companyId}/areas/${areaId}/sectors/${sectorId}/machines/${machineId}/pieces/${pieceId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
