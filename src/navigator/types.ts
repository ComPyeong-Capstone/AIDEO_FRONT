import {NavigatorScreenParams} from '@react-navigation/native';
import {ShortsStackParamList} from './ShortsNavigator';
import {PhotoStackParamList} from './PhotoNavigator';
import {BottomTabParamList} from './BottomTabNavigator';

export type AppStackParamList = {
  // ✅ 메인 탭 네비게이터 (BottomTabNavigator를 포함)
  Main: NavigatorScreenParams<BottomTabParamList>;

  // ✅ 인증 네비게이터 (AuthNavigator)
  Auth: undefined;

  // ✅ 숏츠 흐름 네비게이터
  ShortsStack: NavigatorScreenParams<ShortsStackParamList>;

  // ✅ 사진 흐름 네비게이터
  PhotoStack: NavigatorScreenParams<PhotoStackParamList>;

  // ✅ 숏츠 플레이어 (개별 포스트 확인)
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

  // ✅ 결과 영상 미리보기 화면 (전역 모달에서 진입 시 필요)
  FinalVideoScreen: {
    from?: 'photo' | 'shorts';
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    music?: string;
    musicTitle?: string;
    videos?: string[];
  };
};
