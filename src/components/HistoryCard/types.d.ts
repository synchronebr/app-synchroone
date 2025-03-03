import { TouchableOpacityProps } from "react-native";

import { IDiagnose } from "../../services/dtos/IDiagnose";

export type HistoryCardProps = TouchableOpacityProps & {
  isLastCard?: boolean;
  item: IDiagnose;
};

export type HistoryCardStyleProps = {
  type: Type;
};

export type HistoryCardCircleStyleProps = {
  isLastCard?: boolean;
};

type Type = "S" | "D" | "W";
