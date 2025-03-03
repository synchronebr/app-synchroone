import { GetNotificationByIDResponse } from "../../services/Notifications/types";

export type NotificationCardNavigationProps = {
  navigate(screen: string, data: GetNotificationByIDResponse);
};

export type NotificationCardProps = GetNotificationByIDResponse;
