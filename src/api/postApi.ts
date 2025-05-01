import axiosInstance from './axiosInstance';

// 게시물 등록 시 사용하는 요청 타입 (실제 요청은 FormData 사용)
export interface PostPayload {
  title: string;
  hashtags: string[];
  videoFile: File | Blob;
}

// 게시물 응답 타입
export interface PostResponse {
  postId: number;
  title: string;
  updateTime: string;
  videoURL: string;
  likeCount: number;
  commentCount: number;
  hashtags: string[];
  author: {
    userId: number;
    userName: string;
    profileImage: string;
  };
}

// 🔹 게시물 등록 (multipart/form-data)
export const createPost = async (payload: PostPayload): Promise<string> => {
  try {
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
  } catch (error) {
    throw error;
  }
};

// 🔹 전체 게시물 조회
export const getAllPosts = async (): Promise<PostResponse[]> => {
  try {
    const response = await axiosInstance.get('/posts');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔹 내 게시물 조회
export const getMyPosts = async (): Promise<PostResponse[]> => {
  try {
    const response = await axiosInstance.get('/posts/mine');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔹 해시태그로 게시물 조회
export const getPostsByHashtag = async (
  hashtag: string,
): Promise<PostResponse[]> => {
  try {
    const response = await axiosInstance.get('/posts', {
      params: {hashtag},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔹 게시물 삭제
export const deletePost = async (postId: number): Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
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
  try {
    const response = await axiosInstance.put(`/posts/${postId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
