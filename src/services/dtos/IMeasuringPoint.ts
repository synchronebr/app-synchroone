import { IDevice } from "./IDevice";
import { IReading } from "./IReading";

export interface IMeasuringPoint {
    id: number;
    name: string;
    type: string;
    devicesCode: string | null;
    device: IDevice;
    readings: IReading[]
}