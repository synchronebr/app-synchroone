import { TouchableOpacityProps } from "react-native";

import { IDiagnose } from "../../services/dtos/IDiagnose";

export type DiagnoseFeedbackPageProps = {
  navigate(screen: string, data: IDiagnose);
  goBack();
};


export type DowntimeUnit = "M" | "H";

export interface FeedBackActionData {
  executed: boolean;
  executionDate: Date | null;
  executedComment: string;
  stopAsset: boolean; // ativo parado
  downtimeMinutes: number | null; // valor digitado (min ou horas)
  downtimeUnit: DowntimeUnit; // "M" | "H"
  analysisAction: string; // observações gerais
}

export const SOL = { Confirmed: "C", NotConfirmed: "N", NotApplicable: "NA", Pending: "R" } as const;
export const CauseFB = { Confirmed: "C", NotConfirmed: "N", NotApplicable: "NA", NotClassified: "NC" } as const;

export type Phase = "causes" | "action";
