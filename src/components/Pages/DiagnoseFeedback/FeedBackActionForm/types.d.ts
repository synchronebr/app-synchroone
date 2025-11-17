// types.ts
export type DowntimeUnit = "M" | "H"; // M = minutos, H = horas

export type FeedBackActionData = {
  executed: boolean;
  executionDate: Date | null;
  executedComment: string;

  stopAsset: boolean;
  downtimeMinutes: number | null; // número em minutos/horas conforme unit
  downtimeUnit: DowntimeUnit;   // "M" ou "H"

  analysisAction: string;
};
