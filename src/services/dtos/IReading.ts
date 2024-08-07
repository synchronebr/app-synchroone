export interface IReading {
    id: number;
    vibrationAbsolute: number;
    accelarationAbsolute: number;
    temperature: number;
    securityStatus: string;
    createdAt: Date;
}