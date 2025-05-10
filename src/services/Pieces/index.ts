import api from "../api";

import { UpdatePieceData } from "./types";

export async function getPiecesTypes() {
  const response = await api.get("master-data/pieces/types");

  return response;
}

export async function updatePieceData(
  companyID: number,
  pieceID: number,
  request: UpdatePieceData
) {
  const response = await api.patch(
    `companies/${companyID}/assets/${pieceID}/partialInfos`,
    request
  );

  return response;
}
