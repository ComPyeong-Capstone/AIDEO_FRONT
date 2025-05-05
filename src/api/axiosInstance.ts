import axios from 'axios';
import {getAccessToken, clearAuthTokens} from '../utils/storage';
import {BASE_URL} from '@env';

// ✅ 환경변수 확인
console.log('🧪 BASE_URL from .env:', BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터
axiosInstance.interceptors.request.use(
  async config => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 요청 로그 그룹핑
    console.group('📤 [Axios Request]');
    console.log('➡️ URL:', `${config.baseURL}${config.url}`);
    console.log('➡️ Method:', config.method?.toUpperCase());
    console.log('🧾 Headers:', config.headers);
    if (config.data) console.log('📦 Body:', config.data);
    console.groupEnd();

    return config;
  },
  error => {
    console.error('❌ 요청 인터셉터 에러:', error);
    return Promise.reject(error);
  },
);

// ✅ 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => {
    console.group('📥 [Axios Response]');
    console.log('✅ Status:', response.status);
    console.log('✅ URL:', response.config.url);
    console.log('📄 Response Data:', response.data);
    console.groupEnd();
    return response;
  },
  async error => {
    const status = error?.response?.status;
    const url = error?.config?.url;

    console.group('❌ [Axios Error]');
    console.log('🔴 Status:', status);
    console.log('🔴 URL:', url);
    console.log('🧾 Error Response:', error?.response?.data);
    console.groupEnd();

    // 인증 실패 시 토큰 삭제
    if (status === 401) {
      await clearAuthTokens();
      console.warn('🔒 토큰 만료 → 로그아웃 처리됨');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
