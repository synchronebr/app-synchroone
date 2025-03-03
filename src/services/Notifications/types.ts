export type GetNotificationByIDResponse = {
  id: number;
  userId: number;
  title: string;
  type: string;
  description: string;
  content: string;
  link: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllNotificationsResponse = {
  notifications: GetNotificationByIDResponse[];
  quantity: {
    unread: number;
    read: number;
    total: number;
  };
};
