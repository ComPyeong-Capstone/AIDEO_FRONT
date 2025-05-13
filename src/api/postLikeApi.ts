// src/api/postLikeApi.ts
import axiosInstance from './axiosInstance';

// ✅ 게시물 좋아요 추가
export const postLike = async (postId: number) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/likes`);
    return response.data; // "좋아요를 눌렀습니다." 또는 "이미 좋아요를 눌렀습니다."
  } catch (error) {
    throw error;
  }
};

// ✅ 게시물 좋아요 취소
export const cancelLike = async (postId: number) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}/likes`);
    return response.data; // "좋아요를 취소했습니다." 또는 "좋아요를 누른 기록이 없습니다."
  } catch (error) {
    throw error;
  }
};

// ✅ 게시물 좋아요 누른 유저 목록 조회
export const getLikedUsers = async (postId: number) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}/likes/users`);
    return response.data as {
      userId: number;
      userName: string;
      profileImage: string;
      email: string;
    }[];
  } catch (error) {
    throw error;
  }
};
