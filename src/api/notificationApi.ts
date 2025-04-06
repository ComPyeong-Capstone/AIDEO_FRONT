// src/api/notificationApi.ts
import axios from 'axios';
import {BASE_URL} from '../config/baseUrl';

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
  senderId: number;
  receiverId: number;
  postId: number;
  type: NotificationType;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/notifications`, payload);
    return response.data; // 메시지: 성공 또는 에러
  } catch (error) {
    throw error;
  }
};

// 알림 목록 조회
export const getNotifications = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      params: {userId},
    });
    return response.data as Notification[];
  } catch (error) {
    throw error;
  }
};

// 알림 읽음 처리
export const markNotificationAsRead = async (notiId: number) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/notifications/${notiId}/read`,
    );
    return response.data; // 메시지: 성공 또는 알림 없음
  } catch (error) {
    throw error;
  }
};
