import axios from 'axios';
import {BASE_URL} from '../config/baseUrl';

// ✅ 댓글 조회
export const getComments = async (postId: number, currentUserId: number) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
    params: {currentUserId},
  });
  return response.data;
};

// ✅ 댓글 작성
export const createComment = async (
  postId: number,
  userId: number,
  content: string,
  parentCommentId: number | null = null,
) => {
  const response = await axios.post(
    `${BASE_URL}/posts/${postId}/comments`,
    {content, parentCommentId},
    {params: {userId}},
  );
  return response.data;
};

// ✅ 댓글 삭제
export const deleteComment = async (
  postId: number,
  commentId: number,
  userId: number,
) => {
  const response = await axios.delete(
    `${BASE_URL}/posts/${postId}/comments/${commentId}`,
    {params: {userId}},
  );
  return response.data;
};
