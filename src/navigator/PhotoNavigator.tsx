import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ResultScreen from '../screens/common/ResultScreen';
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PhotoPromptScreen from '../screens/photo/PhotoPromptScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';
import PostVideoScreen from '../screens/common/PostVideoScreen';
import SubtitlesSettingScreen from '../screens/common/SubtitlesSettingScreen'; // ✅ 자막 설정 화면 import

// ✅ Stack Navigator 타입 정의
export type PhotoStackParamList = {
  SelectDurationScreen: {mode: 'photo'};
  PhotoPromptScreen: {duration: number};
  FinalVideoScreen: {
    from?: 'photo';
    prompt: string;
    images: {id: string; uri: string | null}[];
    videos?: string[];
    subtitles?: string[];
    music?: string;
    musicTitle?: string;
  };
  MusicSelectionScreen: {
    prompt: string;
    images: {id: string; uri: string | null}[];
    music?: string;
    musicTitle?: string;
    videos?: string[];
  };
  SubtitlesSettingScreen: {
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
};

// ✅ Stack Navigator 생성
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
          gestureEnabled: true, // ✅ 스와이프 제스처 허용
          gestureDirection: 'horizontal', // ✅ 좌우 스와이프 방향 설정
        }}
      />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="PostVideoScreen" component={PostVideoScreen} />
    </Stack.Navigator>
  );
};

export default PhotoNavigator;
