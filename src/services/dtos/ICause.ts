export interface ICause {
    causeId: number;
    solutionId: number;
    status: string;
    comment?: string;
    causesType: {
        id: number;
        title: string;
        description: string;
    },
    solutions: {
        solutionType: {
            id: m;
            title: string;
            description: string;
        }
        status: string;
        comment?: string;
    }[]
}