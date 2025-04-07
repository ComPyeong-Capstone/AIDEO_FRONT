// src/api/postApi.ts
import axios from 'axios';
import {BASE_URL} from '../config/baseUrl';
import axiosInstance from './axiosInstance';

export interface PostPayload {
  title: string;
  videoURL: string;
  hashtags: string[];
}

export interface PostResponse {
  postId: number;
  title: string;
  userId: number;
  updateTime: string;
  videoURL: string;
  likeCount: number;
  commentCount: number;
  hashtags: string[];
}

// 게시물 등록
export const createPost = async (payload: PostPayload) => {
  try {
    const response = await axiosInstance.post('/posts', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 전체 게시물 조회
export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data as PostResponse[];
  } catch (error) {
    throw error;
  }
};

// 특정 유저 게시물 조회
export const getMyPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/mine');
    return response.data as PostResponse[];
  } catch (error) {
    throw error;
  }
};

// 특정 해시태그 게시물 조회
export const getPostsByHashtag = async (hashtag: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      params: {hashtag},
    });
    return response.data as PostResponse[];
  } catch (error) {
    throw error;
  }
};

// 게시물 삭제
export const deletePost = async (postId: number) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data; // "게시물이 삭제되었습니다."
  } catch (error) {
    throw error;
  }
};

// 게시물 수정
export const updatePost = async (
  postId: number,
  payload: {
    title: string;
    videoURL: string;
    hashtags: string[];
  },
) => {
  try {
    const response = await axiosInstance.put(`/posts/${postId}`, payload);
    return response.data as PostResponse;
  } catch (error) {
    throw error;
  }
};
