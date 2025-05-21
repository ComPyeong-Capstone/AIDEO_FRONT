import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ✅ Screens
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PhotoPromptScreen from '../screens/photo/PhotoPromptScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';
import SubtitlesSettingScreen from '../screens/common/SubtitlesSettingScreen';
import ResultScreen from '../screens/common/ResultScreen';
import URLPosting from '../screens/common/URLPosting';

// ✅ Stack Param 타입 정의
export type PhotoStackParamList = {
  SelectDurationScreen: {mode: 'photo'};

  PhotoPromptScreen: {
    duration: number;
  };

  FinalVideoScreen: {
    from: 'photo';
    prompt: string;
    images: {
      id: string;
      uri: string | null;
      name?: string; // ✅ 이미지 파일명 전달용 (선택적)
    }[];
    videos?: string[];
    subtitles?: string[];
    music?: string;
    musicTitle?: string;

    // ✅ 파일 객체 목록 (서버 요청용)
    files?: {
      uri: string;
      name: string;
      type: string;
    }[];
  };

  MusicSelectionScreen: {
    from: 'photo';
    prompt: string;
    images: {
      id: string;
      uri: string | null;
    }[];
    music?: string;
    musicTitle?: string;
    videos?: string[];
  };

  SubtitlesSettingScreen: {
    from: 'photo';
    videos: string[];
    subtitles: string[];
    music: string;
  };

  ResultScreen: {
    finalVideoUrl: string;
  };

  PostVideoScreen: {
    finalVideoUrl: string;
  };

  URLPosting: undefined;
};

// ✅ Stack 생성
const Stack = createStackNavigator<PhotoStackParamList>();

const PhotoNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SelectDurationScreen"
        component={SelectDurationScreen}
      />
      <Stack.Screen name="PhotoPromptScreen" component={PhotoPromptScreen} />
      <Stack.Screen name="FinalVideoScreen" component={FinalVideoScreen} />
      <Stack.Screen
        name="MusicSelectionScreen"
        component={MusicSelectionScreen}
      />
      <Stack.Screen
        name="SubtitlesSettingScreen"
        component={SubtitlesSettingScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="URLPosting" component={URLPosting} />
    </Stack.Navigator>
  );
};

export default PhotoNavigator;
