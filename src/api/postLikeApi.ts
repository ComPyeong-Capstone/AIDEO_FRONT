// src/api/postLikeApi.ts
import axios from 'axios';
import {BASE_URL} from '../config/baseUrl';

export const postLike = async (postId: number, userId: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/posts/${postId}/likes`,
      null,
      {
        params: {userId},
      },
    );
    return response.data; // "좋아요를 눌렀습니다." 또는 "이미 좋아요를 눌렀습니다."
  } catch (error) {
    throw error;
  }
};

export const cancelLike = async (postId: number, userId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}/likes`, {
      params: {userId},
    });
    return response.data; // "좋아요를 취소했습니다." 또는 "좋아요를 누른 기록이 없습니다."
  } catch (error) {
    throw error;
  }
};

export const getLikedUsers = async (postId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/likes/users`);
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
