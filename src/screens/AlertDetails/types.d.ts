import { TouchableOpacityProps } from "react-native";

import { IDiagnose } from "../../services/dtos/IDiagnose";

export type AlertCardProps = {
  id: number;
};

export type AlertCardNavigationProps = {
  navigate(screen: string, data: GetNotificationByIDResponse);
};
