import api from "../api";

export async function getAllNotifications() {
  const response = await api.get(`notifications`);

  return response;
}

export async function getNotificationByID(notificationID: number) {
  const response = await api.get(`notifications/${notificationID}`);

  return response;
}

export async function markNotificationAsRead(notificationID: number) {
  const response = await api.put(`notifications/${notificationID}/markAsRead`);

  return response;
}
