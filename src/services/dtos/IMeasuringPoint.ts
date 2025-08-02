import { IDevice } from "./IDevice";
import { IReading } from "./IReading";

export interface IMeasuringPoint {
    id: number;
    name: string;
    type: string;
    securityStatus:  "S" | "W" | "D" | "IN";
    devicesCode: string | null;
    device: IDevice;
    readings: IReading[]
}