// src/api/oauthApi.ts
import axiosInstance from './axiosInstance';

export const googleLoginApi = async (idToken: string) => {
  const response = await axiosInstance.post('/oauth/google', { idToken });
  return response.data;
};

export interface SocialLoginResponse {
  user?: {
    userId: number;
    userName: string;
    profileImage: string | null;
  };
  token?: string;
  needSignup?: boolean;
  email?: string;
}

export const googleLogin = async (idToken: string, platform: 'ios' | 'android') => {
  const response = await axiosInstance.post('/oauth/google', {
    idToken,
    platform,
  });
  return response.data;
};



// 🔹 구글 닉네임 설정
export const googleSignup = async (
  email: string,
  nickname: string
): Promise<SocialLoginResponse> => {
  try {
    const response = await axiosInstance.post('/oauth/google/signup', {
      email,
      nickname,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Google 회원가입 실패:', error.response?.data || error.message);
    throw error; // 상위에서 catch할 수 있도록 다시 던짐
  }
};


// 🔹 카카오 로그인
const kakaoLogin = async (
  accessToken: string,
): Promise<SocialLoginResponse> => {
  const response = await axiosInstance.post('/oauth/kakao', {accessToken});
  return response.data;
};

// 🔹 카카오 닉네임 설정
const kakaoSignup = async (nickname: string): Promise<SocialLoginResponse> => {
  const response = await axiosInstance.post('/oauth/kakao/signup', {
    userName: nickname,
  });
  return response.data;
};

// 🔹 카카오 인가 코드 HTML 반환 (웹뷰용)
const getKakaoLoginHTML = async (): Promise<string> => {
  const response = await axiosInstance.get('/oauth/kakao', {
    headers: {Accept: 'text/html'},
    responseType: 'text',
  });
  return response.data;
};

// ✅ 하나의 객체로 묶어서 export
export const oauthApi = {
    googleLogin,
  googleSignup,
  kakaoLogin,
  kakaoSignup,
  getKakaoLoginHTML,
};
