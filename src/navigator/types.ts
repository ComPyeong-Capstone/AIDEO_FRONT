import {NavigatorScreenParams} from '@react-navigation/native';
import {ShortsStackParamList} from './ShortsNavigator';
import {PhotoStackParamList} from './PhotoNavigator';
import {BottomTabParamList} from './BottomTabNavigator';

export type AppStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>; // 메인 탭 네비게이터
  Auth: undefined;

  ShortsStack: NavigatorScreenParams<ShortsStackParamList>; // 숏츠 흐름
  PhotoStack: NavigatorScreenParams<PhotoStackParamList>; // 사진 흐름

  ShortsPlayerScreen: {
    postId: number;
    title: string;
    creator: string;
    currentUserId: number;
    creatorUserId: number;
    showComments: boolean;
  };
 URLPosting: {
    finalVideoUrl: string | null;
    title: string;
    tags: string;
  };

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
  FilePosting: {
    finalVideoUrl: string | null;
    title: string;
    tags: string;
  };
   YouTubeUploadScreen: {
      videoURI: string;
    };
};
