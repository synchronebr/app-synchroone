export type GetHomeScreen = {
  findCountStatus: {
    total: number;
    warnDanger: number;
    safe: number;
    warning: number;
    danger: number;
  };
  diagnosesByPiece: {
    description: string;
    count: number;
    pathNames: string[];
  }[];
  attentionPieces: {
    pieceId: number;
    description: string;
    image: string | null;
    securityStatus: 'S' | 'W' | 'D';
    securityStatusDate: string;
    pathNames: string[];
    responsibles: {
      id: number;
      name: string;
      email: string;
      phone: string;
      avatar: string;
    }[];
  }[];
};
