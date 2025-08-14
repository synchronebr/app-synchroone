import { IPath } from "./IPath";
import { IMeasuringPoint } from "./IMeasuringPoint";

export interface IEquipment {
  id: number;
  description: string;
  path: IPath;
  measuringPoints: IMeasuringPoint[]
  image?: string;
  securityStatus: 'S' | 'W' | 'D' | 'IN';
  pathNames: string[];
  readings: {
    id: number;
    securityStatus: string;
    securityStatusDate: Date;
    type: string;
    createdAt: Date;
    readingAt: string;
  }[],
}