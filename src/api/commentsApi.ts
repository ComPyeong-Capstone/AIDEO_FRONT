import axiosInstance from './axiosInstance';

// ✅ 댓글 조회
export const getComments = async (postId: number) => {
  const response = await axiosInstance.get(`/posts/${postId}/comments`);
  return response.data;
};

// ✅ 댓글 작성
export const createComment = async (
  postId: number,
  content: string,
  parentCommentId: number | null = null,
) => {
  const response = await axiosInstance.post(`/posts/${postId}/comments`, {
    content,
    parentCommentId,
  });
  return response.data;
};

// ✅ 댓글 삭제
export const deleteComment = async (postId: number, commentId: number) => {
  const response = await axiosInstance.delete(
    `/posts/${postId}/comments/${commentId}`,
  );
  return response.data;
};
