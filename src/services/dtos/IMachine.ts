import { IResponsible } from "./IResponsible";
import { ISector } from "./ISector";

export interface IMachine {
    id: number;
    name: string;
    responsible: IResponsible;
    sector: ISector
}