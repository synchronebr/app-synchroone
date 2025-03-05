export interface IDiagnose {
    id: number;
    title: string; 
    description: string; 
    type: 'S' | 'W' | 'D';
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
                machine: {
                    id: string;
                    name: string;
                    sector: {
                        id: string;
                        name: string;
                        area: {
                            id: string;
                            name: string;
                            company: {
                                id: string;
                                name: string;
                            }
                        }
                    }
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