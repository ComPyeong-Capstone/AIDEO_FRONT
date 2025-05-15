//getThumbnailsApi.ts

import {videoAxiosInstance} from './axiosInstance';

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
