import {NavigatorScreenParams} from '@react-navigation/native';
import {ShortsStackParamList} from './ShortsNavigator';
import {PhotoStackParamList} from './PhotoNavigator';
import {BottomTabParamList} from './BottomTabNavigator';

export type AppStackParamList = {
  // ✅ 메인 탭 네비게이터
  Main: NavigatorScreenParams<BottomTabParamList>;

  // ✅ 인증 네비게이터
  Auth: undefined;

  // ✅ 숏츠 흐름
  ShortsStack: NavigatorScreenParams<ShortsStackParamList>;

  // ✅ 사진 흐름
  PhotoStack: NavigatorScreenParams<PhotoStackParamList>;

  // ✅ 숏츠 재생 화면
  ShortsPlayerScreen: {
    postId: number;
    title: string;
    creator: string;
    currentUserId: number;
    creatorUserId: number;
    showComments: boolean;
  };

  // ✅ URL 공유용 업로드 화면
  URLPosting: {
    finalVideoUrl: string | null;
    title: string;
    tags: string;
  };

  // ✅ 파일 업로드 화면
  FilePosting: {
    finalVideoUrl: string | null;
    title: string;
    tags: string;
  };

  // ✅ 유튜브 업로드 화면
  YouTubeUploadScreen: {
    videoURI: string;
  };

  // ✅ 결과 영상 미리보기 화면 (숏츠 또는 사진 기반)
  FinalVideoScreen: {
    from?: 'photo' | 'shorts';
    duration: number;
    prompt: string;

    // 숏츠 기반
    imageUrls?: string[];

    // 사진 기반
    images?: {
      id: string;
      uri: string | null;
      name?: string;
    }[];

    subtitles: string[];
    music?: string;
    musicTitle?: string;
    videos?: string[];

    // 선택적: 파일 정보 전달
    files?: {
      uri: string;
      name: string;
      type: string;
    }[];
  };
};
