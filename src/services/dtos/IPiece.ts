import { IPath } from "./IPath";
import { IMeasuringPoint } from "./IMeasuringPoint";
import { IResponsible } from "./IResponsible";

export interface IPiece {
    id: number;
    description: string;
    type: number;
    pieceType: {
        id: true;
        description: true;
    };
    image?: string;
    brand: string;
    model: string;
    rotation: number;
    rotationEnd?: string;
    power: number;
    engineGrooves?: string;
    statorGrooves?: string;
    responsibles: {
        responsible: IResponsible;
    }[];
    transmission: number;
    path?: IPath,
    measuringPoints: IMeasuringPoint[]
}