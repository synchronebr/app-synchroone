import { IPiece } from "../dtos/IPiece";

export type EquipmentsResponse = {
  data: {
    items: IPiece[]
    filters: Record<string, { id: number, name: string }[]>
  }
  total: number;
};
