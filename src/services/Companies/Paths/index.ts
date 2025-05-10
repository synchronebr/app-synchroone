import api from "../../api";

// import { CompaniesResponse } from "./types";

export async function getPathsForSelect(
  companyId: number,
  parentId?: number
): Promise<{ label: string; value: string }[] | any> {
  let params = {} as any;
  if (parentId) params = { parentId };
  let response = await api.get(
    `companies/${companyId}/paths/filters`,
    {
      params
    }
  );

  let items = [];
  if (response.data) {
    response.data.map((item) =>
      items.push({ label: item.title, value: item.id })
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
