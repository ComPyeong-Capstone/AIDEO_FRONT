import axios from 'axios';
import {getAccessToken, clearAuthTokens} from '../utils/storage';
import {BASE_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await clearAuthTokens();
      console.warn('🔒 토큰 만료: 자동 로그아웃 처리됨');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
