// src/api/notificationApi.ts
import axiosInstance from './axiosInstance';

export type NotificationType = 'LIKE' | 'COMMENT' | 'COMMENT_LIKE';

export interface Notification {
  notiId: number;
  senderId: number;
  receiverId: number;
  postId: number;
  notiType: NotificationType;
  notiRead: boolean;
  notiTime: string; // ISO timestamp
}

// 알림 생성
export const createNotification = async (payload: {
  receiverId: number;
  postId: number;
  type: NotificationType;
}) => {
  try {
    const response = await axiosInstance.post('/notifications', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 알림 목록 조회
export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get('/notifications');
    return response.data as Notification[];
  } catch (error) {
    throw error;
  }
};

// 알림 읽음 처리
export const markNotificationAsRead = async (notiId: number) => {
  try {
    const response = await axiosInstance.put(`/notifications/${notiId}/read`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
