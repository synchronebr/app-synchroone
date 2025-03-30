import { TouchableOpacityProps } from "react-native";

import { IDiagnose } from "../../services/dtos/IDiagnose";

export type AlertCardProps = {
  data: IDiagnose['causes'][0];
  securityStatus: string;
};
