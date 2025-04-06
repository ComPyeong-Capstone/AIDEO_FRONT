import axios from 'axios';
import {getAccessToken, clearAuthTokens} from '../utils/storage';
import {BASE_URL} from '../config/baseUrl';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 시 accessToken 자동 삽입
axiosInstance.interceptors.request.use(
  async config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// ✅ 응답에서 401 발생 시 → 자동 로그아웃 처리
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // accessToken이 만료된 경우 → 토큰 삭제
      await clearAuthTokens();

      // TODO: logout 전역 함수 호출 가능하면 여기서 호출
      // 예: import {logout} from '../context/UserContext'; logout();

      // 필요한 경우: Alert 띄우기, 또는 로그인 페이지 이동 처리
      console.warn('🔒 토큰 만료: 자동 로그아웃 처리됨');

      // 👉 그냥 에러 반환 (사용자가 catch에서 처리하도록)
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
