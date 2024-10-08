import { IMachine } from "../dtos/IMachine";

export type EquipmentsResponse = {
  data: {
    items: IMachine[]
    filters: Record<string, { id: number, name: string }[]>
  }
  total: number;
};
