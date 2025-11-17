import { ICause } from "./ICause";

export interface IDiagnose {
    id: number;
    title: string; 
    status: string; 
    description: string; 
    type: 'S' | 'W' | 'D' | 'IN';
    hazardousness: string;
    createdAt: Date; 
    percent: number;
    read: boolean;
    downtimeMinutes: string;
    downtimeValue: number;
    executionDate: Date;
    executedComment: string;
    reading: {
        id: string;
        type: string;
        measuringPoint: {
            id: string;
            piece: {
                id: string;
                description: string;
                company: {
                    id: string;
                    name: string;
                },
                path?: {
                    id: number;
                    title: string;
                },
                pathNames: string[];
            }
        }
    },
    causes: ICause[];
    executed?: boolean | null;
    stopAsset?: boolean | null;
    analysisAction?: string | null;
}