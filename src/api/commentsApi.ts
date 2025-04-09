import axiosInstance from './axiosInstance';

export interface Reply {
  id: number;
  userId: number;
  username: string;
  content: string;
  liked: boolean;
}

export interface Comment {
  id: number;
  userId: number;
  username: string;
  content: string;
  liked: boolean;
  replies: Reply[];
}

// ✅ 댓글 조회
export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await axiosInstance.get(`/posts/${postId}/comments`);
  const rawData = response.data;

  const comments: Comment[] = rawData.map((item: any) => ({
    id: item.commentId, // 🔄 변환
    userId: item.userId,
    username: item.username ?? '알 수 없음',
    content: item.content,
    liked: item.likedByMe,
    replies: [], // 🔁 replies 데이터가 있을 경우 여기서 변환
  }));

  return comments;
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
