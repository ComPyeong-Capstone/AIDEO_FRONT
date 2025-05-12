import axiosInstance from './axiosInstance';

// 📌 게시물 업로드용 Payload
export interface PostPayload {
  title: string;
  hashtags: string[];
  videoFile: File | Blob;
}

// 📌 게시물 응답 타입
export interface PostResponse {
  postId: number;
  title: string;
  updateTime: string;
  videoURL?: string;
  thumbnailURL?: string;
  likeCount: number;
  commentCount: number;
  hashtags: string[];
  author: {
    userId: number;
    userName: string;
    profileImage: string;
  };
}

// 🔹 게시물 등록 (FormData)
export const createPost = async (
  payload: PostPayload,
): Promise<{message: string}> => {
  const formData = new FormData();
  formData.append(
    'postDTO',
    JSON.stringify({
      title: payload.title,
      hashtags: payload.hashtags,
    }),
  );
  formData.append('videoFile', payload.videoFile);

  const response = await axiosInstance.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// 🔹 전체 게시물 조회
export const getAllPosts = async (): Promise<PostResponse[]> => {
  const response = await axiosInstance.get('/posts');
  return response.data;
};

// 🔹 게시물 재생 (상세 조회)
export const getPostById = async (postId: number): Promise<PostResponse> => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

// 🔹 내 게시물 조회
export const getMyPosts = async (): Promise<PostResponse[]> => {
  const response = await axiosInstance.get('/posts/mine');
  return response.data;
};

// 🔹 특정 해시태그 게시물 조회
export const getPostsByHashtag = async (
  hashtag: string,
): Promise<PostResponse[]> => {
  const response = await axiosInstance.get('/posts', {
    params: {hashtag},
  });
  return response.data;
};

// 🔹 게시물 삭제
export const deletePost = async (
  postId: number,
): Promise<{message: string}> => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};

// 🔹 게시물 수정
export const updatePost = async (
  postId: number,
  payload: {
    title: string;
    videoURL: string;
    hashtags: string[];
  },
): Promise<PostResponse> => {
  const response = await axiosInstance.put(`/posts/${postId}`, payload);
  return response.data;
};

export const getPostThumbnails = async (): Promise<PostThumbnail[]> => {
  const response = await axiosInstance.get('/posts');
  const data: PostResponse[] = response.data;

  // 필요한 필드만 추려서 반환
  return data.map(post => ({
    postId: post.postId,
    title: post.title,
    thumbnailURL: post.thumbnailURL ?? '',
    author: {
      userId: post.author.userId,
      userName: post.author.userName,
      profileImage: post.author.profileImage,
    },
  }));
};