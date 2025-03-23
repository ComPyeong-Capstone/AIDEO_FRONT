// src/api/userApi.ts
import axios from 'axios';
import {BASE_URL} from '../config/baseUrl'; // ✅ BASE_URL 외부에서 불러옴

export const userApi = {
  // ✅ 회원가입
  signup: (userName: string, email: string, password: string) =>
    axios.post(`${BASE_URL}/users`, {
      userName,
      email,
      password,
    }),

  // ✅ 로그인
  login: (email: string, password: string) =>
    axios.get(`${BASE_URL}/users/login`, {
      params: {
        email,
        password,
      },
    }),

  // ✅ 닉네임 변경
  updateNickname: (userId: number, newNickname: string) =>
    axios.put(`${BASE_URL}/users/${userId}/nickname`, {
      newNickname,
    }),

  // ✅ 프로필 이미지 변경
  updateProfileImage: (userId: number, profileImageUrl: string) =>
    axios.put(`${BASE_URL}/users/${userId}/profile-image`, {
      profileImageUrl,
    }),
};
