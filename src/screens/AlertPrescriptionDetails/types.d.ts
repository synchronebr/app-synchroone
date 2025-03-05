import { TouchableOpacityProps } from "react-native";

import { IDiagnose } from "../../services/dtos/IDiagnose";

export type AlertCardProps = {
  item: IDiagnose['causes'][0];
};
