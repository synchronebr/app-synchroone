import { IPath } from "./IPath";
import { IMeasuringPoint } from "./IMeasuringPoint";

export interface IEquipment {
  id: number;
  description: string;
  path: IPath;
  measuringPoints: IMeasuringPoint[]
  image?: string;
}