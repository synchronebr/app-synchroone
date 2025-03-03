import { GetNotificationByIDResponse } from "../../services/Notifications/types";

export type Data = GetNotificationByIDResponse[];

export type HomeNavigationProps = {
  navigate(screen: string, data: GetNotificationByIDResponse[]): void;
};
