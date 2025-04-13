export type GetPiecesTypesResponse = {
  id: number;
  description: string;
}[];

export type UpdatePieceData = {
  id: number;
  brand?: string;
  description: string;
  model?: string;
  type: number;
};
