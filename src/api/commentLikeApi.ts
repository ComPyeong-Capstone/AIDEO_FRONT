// src/api/commentLikeApi.ts
import axiosInstance from './axiosInstance';

// 댓글 좋아요 추가
export const likeComment = async (postId: number, commentId: number) => {
  try {
    const response = await axiosInstance.post(
      `/posts/${postId}/comments/${commentId}/likes`,
    );
    return response.data; // "댓글 좋아요 성공!"
  } catch (error) {
    throw error;
  }
};

// 댓글 좋아요 취소
export const unlikeComment = async (postId: number, commentId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/posts/${postId}/comments/${commentId}/likes`,
    );
    return response.data; // "댓글 좋아요 취소 성공!"
  } catch (error) {
    throw error;
  }
};
