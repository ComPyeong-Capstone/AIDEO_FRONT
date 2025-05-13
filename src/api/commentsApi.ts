import axiosInstance from './axiosInstance';

// 👤 작성자 정보
export interface Author {
  userId: number;
  userName: string;
  profileImage: string;
}

// 💬 댓글 타입 (대댓글도 포함)
export interface Comment {
  commentId: number;
  postId: number;
  content: string;
  parentCommentID: number | null;
  createdAt: string;
  likeCount: number;
  likedByMe: boolean;
  author: Author;
  replies: Comment[]; // ✅ 항상 배열로 보장
}

// 📝 댓글 작성 요청용
export interface CommentPayload {
  content: string;
  parentCommentId: number | null;
}

// ✅ 댓글 목록 조회 (대댓글 포함 구조로 반환)
export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await axiosInstance.get(`/posts/${postId}/comments`);
  const rawData = response.data as Comment[];

  const rootComments: Comment[] = [];
  const repliesMap: Record<number, Comment[]> = {};

  // 1단계: 부모/대댓글 분류
  for (const comment of rawData) {
    if (comment.parentCommentID === null) {
      rootComments.push({...comment, replies: []});
    } else {
      if (!repliesMap[comment.parentCommentID]) {
        repliesMap[comment.parentCommentID] = [];
      }
      repliesMap[comment.parentCommentID].push(comment);
    }
  }

  // 2단계: replies 정리해서 부모에 붙이기
  const structured = rootComments.map(comment => ({
    ...comment,
    replies: repliesMap[comment.commentId] ?? [],
  }));

  return structured;
};

// ✅ 댓글 작성
export const createComment = async (
  postId: number,
  content: string,
  parentCommentId: number | null = null,
): Promise<Comment> => {
  const response = await axiosInstance.post(`/posts/${postId}/comments`, {
    content,
    parentCommentId,
  });
  return response.data;
};

// ✅ 댓글 삭제
export const deleteComment = async (
  postId: number,
  commentId: number,
): Promise<string> => {
  const response = await axiosInstance.delete(
    `/posts/${postId}/comments/${commentId}`,
  );
  return response.data;
};
