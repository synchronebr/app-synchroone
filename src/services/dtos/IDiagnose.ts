export interface IDiagnose {
    id: number;
    title: string; 
    description: string; 
    type: 'S' | 'W' | 'D' | 'IN';
    hazardousness: string;
    createdAt: Date; 
    percent: number;
    read: boolean;
    reading: {
        id: string;
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
                }
            }
        }
    },
    causes: {
        causesType: {
            id: string;
            title: string;
            description: string;
        },
        solutions: {
            solutionType: {
                id: string;
                title: string;
                description: string;
            }
        }[]
    }[];
}