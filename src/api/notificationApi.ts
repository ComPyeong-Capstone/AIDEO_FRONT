import axiosInstance from './axiosInstance';

// 알림 타입 정의
export type NotificationType = 'LIKE' | 'COMMENT' | 'COMMENT_LIKE' | 'REPLY';

export interface Notification {
  notiId: number;
  sender: {
    userId: number;
    userName: string;
    profileImage: string;
  };
  receiverId: number;
  postId: number;
  notiType: NotificationType;
  notiRead: boolean;
  notiTime: string;

  // 🔹 선택적 필드들 (화면 이동 등에 사용)
  creatorUserName?: string;
  creatorUserId?: number;
  postTitle?: string;
}

// 알림 생성
export const createNotification = async (params: {
  receiverId: number;
  postId: number;
  type: NotificationType;
}) => {
  const response = await axiosInstance.post('/notifications', params);
  return response.data;
};

// 알림 목록 조회
export const getNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get('/notifications');
  return response.data;
};

// 알림 읽음 처리
export const markNotificationAsRead = async (notiId: number) => {
  const response = await axiosInstance.put(`/notifications/${notiId}/read`);
  return response.data;
};
