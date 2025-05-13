import axiosInstance from './axiosInstance';

// ✅ 댓글 좋아요 추가
export const likeComment = async (postId: number, commentId: number) => {
  try {
    console.log(
      '📲 [POST] 댓글 좋아요 요청:',
      `/posts/${postId}/comments/${commentId}/likes`,
    );

    const response = await axiosInstance.post(
      `/posts/${postId}/comments/${commentId}/likes`,
    );
    return response.data; // "댓글 좋아요 성공"
  } catch (error: any) {
    console.error(
      '❌ 댓글 좋아요 실패:',
      error.response?.data?.message || error.message,
    );
    throw error;
  }
};

// ✅ 댓글 좋아요 취소
export const unlikeComment = async (postId: number, commentId: number) => {
  try {
    console.log(
      '📲 [DELETE] 댓글 좋아요 취소:',
      `/posts/${postId}/comments/${commentId}/likes`,
    );

    const response = await axiosInstance.delete(
      `/posts/${postId}/comments/${commentId}/likes`,
    );
    return response.data; // "댓글 좋아요 취소 성공"
  } catch (error: any) {
    console.error(
      '❌ 댓글 좋아요 취소 실패:',
      error.response?.data?.message || error.message,
    );
    throw error;
  }
};
