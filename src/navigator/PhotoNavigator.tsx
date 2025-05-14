import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ResultScreen from '../screens/common/ResultScreen';
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PhotoPromptScreen from '../screens/photo/PhotoPromptScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';

// ✅ Stack Navigator 타입 정의
export type PhotoStackParamList = {
  SelectDurationScreen: {mode: 'photo'};
  PhotoPromptScreen: {duration: number};
  FinalVideoScreen: {
    from?: 'photo'; // ✅ 흐름 구분
    prompt: string;
    images: {id: string; uri: string | null}[];
    videos?: string[]; // ✅ 부분 영상 리스트
    subtitles?: string[]; // ✅ 자막 리스트
    music?: string; // ✅ 선택된 음악
    musicTitle?: string; // ✅ 음악 제목
  };
  MusicSelectionScreen: {
    prompt: string;
    images: {id: string; uri: string | null}[];
    music?: string;
    musicTitle?: string; // ✅ 음악 제목
    videos?: string[]; // ✅ 기존 생성된 영상 (재사용 목적)
  };
  ResultScreen: {
    finalVideoUrl: string; // ✅ 최종 영상 URL
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
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default PhotoNavigator;
