import api from "../../../api";

// import { CompaniesResponse } from "./types";

export async function getMeasuringPointsForSelect(
  companyId: number,
  pieceId: number
): Promise<{ label: string; value: string }[] | any> {
  let response = await api.get(
    `assets/${pieceId}/measuringPoints`,
    {
      params: {
        companyId,
        notSetUp: false,
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
  pieceId: number,
  formData: FormData
) {
  return await api.put(
    `assets/${pieceId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
