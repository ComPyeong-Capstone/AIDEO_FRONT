// src/types/navigation.ts

// 루트 스택 내비게이션 (앱 진입 시 사용되는 화면들)
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Signup: undefined;
  GoogleSignup: {email?: string}; // 구글 닉네임 설정
  KakaoLoginWebView: undefined; // 카카오 WebView 로그인
  KakaoSignup: undefined; // 카카오 닉네임 설정
};

// 바텀 탭 내비게이션
export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  Notifications: undefined;
  Profile: undefined;
};

// 앱 내 주요 스택 네비게이션 (메인 탭, 영상 등록, 쇼츠 플레이어 등)
export type AppStackParamList = {
  // ✅ 내부 screen 이동이 가능하도록 Main 타입 수정
  Main:
    | undefined
    | {
        screen: keyof BottomTabParamList;
        params?: BottomTabParamList[keyof BottomTabParamList];
      };

  Auth: undefined;
  ShortsStack: undefined;
  PhotoStack: undefined;

  ShortsPlayerScreen: {
    postId: number;
    title: string;
    creator: string;
    currentUserId: number;
    creatorUserId: number;
    showComments: boolean;
  };

  PostVideoScreen: undefined;
};
