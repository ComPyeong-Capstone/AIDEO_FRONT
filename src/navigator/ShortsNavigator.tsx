import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ✅ Screens
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PromptInputScreen from '../screens/shorts/31-PromptInputScreen';
import ImageSelectionScreen from '../screens/shorts/32-ImageSelectionScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';
import ResultScreen from '../screens/common/ResultScreen';

// ✅ Stack Param 타입 정의
export type ShortsStackParamList = {
  SelectDurationScreen: {mode: 'shorts' | 'photo'};
  PromptInputScreen: {duration: number};
  ImageSelectionScreen: {
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    videos?: string[]; // ✅ 재사용할 부분 영상 리스트
  };
  FinalVideoScreen: {
    from?: 'photo' | 'shorts';
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    music?: string;
    musicTitle?: string;
    videos?: string[]; // ✅ 부분 영상 리스트
  };
  MusicSelectionScreen: {
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    music?: string;
    musicTitle?: string;
    videos?: string[]; // ✅ 부분 영상 리스트
  };
  ResultScreen: {
    videos: string[]; // ✅ 최종 영상 1개일 수도 있지만 string[] 형태 유지
    subtitles: string[];
    music?: string;
  };
};

// ✅ Stack Navigator 생성
const Stack = createStackNavigator<ShortsStackParamList>();

const ShortsNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SelectDurationScreen"
        component={SelectDurationScreen}
      />
      <Stack.Screen name="PromptInputScreen" component={PromptInputScreen} />
      <Stack.Screen
        name="ImageSelectionScreen"
        component={ImageSelectionScreen}
      />
      <Stack.Screen name="FinalVideoScreen" component={FinalVideoScreen} />
      <Stack.Screen
        name="MusicSelectionScreen"
        component={MusicSelectionScreen}
      />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default ShortsNavigator;
