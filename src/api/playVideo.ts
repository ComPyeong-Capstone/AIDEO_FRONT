import {axiosInstance} from './axiosInstance';
import {PostResponse} from './postApi'; // 이미 정의된 타입을 재사용

// 🔹 게시물 상세 조회
export const getPostDetail = async (postId: number): Promise<PostResponse> => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};
