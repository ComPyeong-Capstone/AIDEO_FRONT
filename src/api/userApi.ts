// src/api/userApi.ts

import axiosInstance from './axiosInstance';

/** 로그인 응답 타입 */
export interface LoginResponse {
  accesstoken: string;
  refreshToken: string;
  user: {
    userId: number;
    userName: string;
    profileImage: string | null;
  };
}

/** 사용자 API 모듈 */
export const userApi = {
  /** 🔹 회원가입 */
  signup: async (
    userName: string,
    email: string,
    password: string,
  ): Promise<void> => {
    await axiosInstance.post('/users', {
      userName,
      email,
      password,
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

  /** 🔹 프로필 이미지 파일명만 서버에 전송 */
  updateProfileImageByName: async (fileName: string): Promise<void> => {
    await axiosInstance.put('/users/profile-image', {
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
