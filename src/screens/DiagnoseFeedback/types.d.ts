import { TouchableOpacityProps } from "react-native";

import { IDiagnose } from "../../services/dtos/IDiagnose";

export type DiagnoseFeedbackPageProps = {
  navigate(screen: string, data: IDiagnose);
  goBak();
};
