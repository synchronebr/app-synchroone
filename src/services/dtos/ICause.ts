export interface ICause {
    causeId: number;
    solutionId: number;
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
}