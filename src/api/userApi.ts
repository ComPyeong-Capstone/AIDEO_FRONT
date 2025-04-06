// src/api/userApi.ts

import axiosInstance from './axiosInstance';
import {getRandomProfileImageFileName} from '../utils/defaultProfile';

export const userApi = {
  // ✅ 회원가입
  signup: (userName: string, email: string, password: string) => {
    return axiosInstance.post('/users', {
      userName,
      email,
      password,
    });
  },

  // ✅ 로그인
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });

    const {token, user} = response.data;

    if (!token || !user) {
      throw new Error('로그인 응답이 올바르지 않습니다.');
    }

    // 🔧 프로필 이미지가 null일 경우 기본 이미지 랜덤 지정
    if (!user.profileImage) {
      user.profileImage = getRandomProfileImageFileName();
    }

    return {
      accessToken: token, // 🔁 명시적으로 accessToken으로 리턴
      refreshToken: '', // ❌ 없으므로 비워서 처리
      user,
    };
  },

  // ✅ 닉네임 변경
  updateNickname: (newNickname: string) => {
    return axiosInstance.put('/users/nickname', {
      newNickname,
    });
  },

  // ✅ 프로필 이미지 변경
  updateProfileImage: (profileImageUrl: string) => {
    return axiosInstance.put('/users/profile-image', {
      profileImageUrl,
    });
  },
};
