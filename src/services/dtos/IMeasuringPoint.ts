import { IDevice } from "./IDevice";
import { IReading } from "./IReading";

export interface IMeasuringPoint {
    id: number;
    name: string;
    devicesCode: string | null;
    device: IDevice;
    readings: IReading[]
}