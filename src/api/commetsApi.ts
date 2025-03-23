// src/api/commentsApi.ts
import axios from 'axios';
import {BASE_URL} from '../config/baseUrl'; // ✅ baseUrl 분리한 파일에서 import

// ✅ 댓글 조회
export const getComments = async (postId: number) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
  return response.data; // array of comments
};

// ✅ 댓글 작성
export const createComment = async (
  postId: number,
  userId: number,
  comments: string,
) => {
  const response = await axios.post(`${BASE_URL}/posts/${postId}/comments`, {
    postId,
    userId,
    comments,
  });
  return response.data; // comment object
};

// ✅ 댓글 삭제
export const deleteComment = async (postId: number, commentId: number) => {
  const response = await axios.delete(
    `${BASE_URL}/posts/${postId}/comments/${commentId}`,
  );
  return response.data; // "댓글이 삭제되었습니다."
};
