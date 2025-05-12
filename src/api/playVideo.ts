import axiosInstance from './axiosInstance';
import { PostResponse } from './postApi'; // ❗혹은 타입 정의가 분리되어 있다면 수정 필요

export const getPostDetail = async (postId: number): Promise<PostResponse> => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};
