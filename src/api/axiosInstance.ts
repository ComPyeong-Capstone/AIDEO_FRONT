import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
  clearAuthTokens,
} from '../utils/storage';
import {BASE_URL} from '@env';

console.log('🧪 BASE_URL from .env:', BASE_URL);

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}${BASE_URL.endsWith(':8080') ? '' : ':8080'}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const videoAxiosInstance = axios.create({
  baseURL: `${BASE_URL}${BASE_URL.endsWith(':8000') ? '' : ':8000'}`,
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const attachInterceptors = (instance: typeof axiosInstance) => {
  instance.interceptors.request.use(
    async config => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.group('📤 [Axios Request]');
      console.log('➡️ URL:', `${config.baseURL}${config.url}`);
      console.log('➡️ Method:', config.method?.toUpperCase());
      console.log('🧾 Headers:', config.headers);
      if (config.data) {
        console.log('📦 Body:', config.data);
      }
      console.groupEnd();

      return config;
    },
    error => {
      console.error('❌ 요청 인터셉터 에러:', error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      console.group('📥 [Axios Response]');
      console.log('✅ Status:', response.status);
      console.log('✅ URL:', response.config.url);
      console.log('📄 Response Data:', response.data);
      console.groupEnd();
      return response;
    },
    async error => {
      const originalRequest = error.config;
      const status = error?.response?.status;

      console.group('❌ [Axios Error]');
      console.log('🔴 Status:', status);
      console.log('🔴 URL:', originalRequest?.url);
      console.log('🧾 Error Response:', error?.response?.data);
      console.groupEnd();

      // 🔄 accessToken 만료 시 refreshToken으로 재요청 시도
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = await getRefreshToken(); // ✅ await 추가
        if (!refreshToken) {
          await clearAuthTokens();
          return Promise.reject(error);
        }

        try {
          const response = await axios.post(
            `${BASE_URL}${
              BASE_URL.endsWith(':8080') ? '' : ':8080'
            }/auth/refresh`,
            {refreshToken},
          );

          const {accesstoken} = response.data;

          // ✅ 저장 방식에 맞게 수정
          await saveAuthTokens(accesstoken, refreshToken);

          originalRequest.headers.Authorization = `Bearer ${accesstoken}`;
          return instance(originalRequest); // 재요청
        } catch (refreshError) {
          console.error('🔒 토큰 갱신 실패:', refreshError);
          await clearAuthTokens();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};

attachInterceptors(axiosInstance);
attachInterceptors(videoAxiosInstance);

export default axiosInstance;
