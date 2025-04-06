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
      accessToken: token, // ✅ 명시적으로 이름 변경
      refreshToken: '', // ✅ 백엔드에서 안 주므로 빈 문자열
      user,
    };
  },

  // ✅ 닉네임 변경 (토큰 필요)
  updateNickname: (newNickname: string) => {
    return axiosInstance.put('/users/nickname', {
      newNickname,
    });
  },

  // ✅ 프로필 이미지 변경 (토큰 필요)
  updateProfileImage: (profileImageUrl: string) => {
    return axiosInstance.put('/users/profile-image', {
      profileImageUrl,
    });
  },
};
