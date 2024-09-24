export interface IDiagnose {
    id: number;
    title: string; 
    description: string; 
    type: 'S' | 'W' | 'D';
    hazardousness: string;
    createdAt: Date; 
    percent: number;
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
    failures: {
            failureType: {
                id: string;
                title: string;
                description: string;
            },
            solutionType: {
                id: string;
                title: string;
                description: string;
            }
        }[];
}