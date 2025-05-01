// src/api/userApi.ts

import axiosInstance from './axiosInstance';
import {getRandomProfileImageFileName} from '../utils/defaultProfile';

/** 로그인 응답 타입 */
export interface LoginResponse {
  user: {
    userId: number;
    userName: string;
    profileImage: string | null;
  };
  token: string;
}

/** 사용자 API 모듈 */
export const userApi = {
  /** 🔹 회원가입 */
  signup: async (
    userName: string,
    email: string,
    password: string,
  ): Promise<void> => {
    const profileImage = getRandomProfileImageFileName();
    await axiosInstance.post('/users', {
      userName,
      email,
      password,
      profileImage,
    });
  },

  /** 🔹 로그인 */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });
    return response.data;
  },

  /** 🔹 프로필 이미지 파일명만 전송 */
  updateProfileImageByName: async (fileName: string): Promise<void> => {
    await axiosInstance.put('/users/profile-image-filename', {
      profileImage: fileName,
    });
  },

  /** 🔹 닉네임 변경 */
  updateNickname: async (newNickname: string): Promise<void> => {
    await axiosInstance.put('/users/nickname', {
      newNickname,
    });
  },
};
