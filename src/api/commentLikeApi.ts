// src/api/commentLikeApi.ts
import axios from 'axios';
import {BASE_URL} from '../config/baseUrl';

// 댓글 좋아요 추가
export const likeComment = async (
  postId: number,
  commentId: number,
  userId: number,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/posts/${postId}/comments/${commentId}/likes`,
      null,
      {
        params: {userId},
      },
    );
    return response.data; // "댓글 좋아요 성공!"
  } catch (error) {
    throw error;
  }
};

// 댓글 좋아요 취소
export const unlikeComment = async (
  postId: number,
  commentId: number,
  userId: number,
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/posts/${postId}/comments/${commentId}/likes`,
      {
        params: {userId},
      },
    );
    return response.data; // "댓글 좋아요 취소 성공!"
  } catch (error) {
    throw error;
  }
};
