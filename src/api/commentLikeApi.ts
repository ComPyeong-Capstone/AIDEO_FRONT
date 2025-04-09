// src/api/commentLikeApi.ts
import axiosInstance from './axiosInstance';

// 댓글 좋아요 추가
export const likeComment = async (postId: number, commentId: number) => {
  try {
    console.log(
      '📲 like 요청 →',
      `/posts/${postId}/comments/${commentId}/likes`,
    );
    const response = await axiosInstance.post(
      `/posts/${postId}/comments/${commentId}/likes`,
    );
    return response.data;
  } catch (error: any) {
    console.error(
      '❌ likeComment 실패:',
      error.response?.data ?? error.message,
    );
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
