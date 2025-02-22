import { IMachine } from "./IMachine";
import { IMeasuringpoint } from "./IMeasuringPoint";

export interface IEquipment {
  id: number;
  description: string;
  machine: IMachine;
  measuringPoints: IMeasuringpoint[]
  image?: string;
}