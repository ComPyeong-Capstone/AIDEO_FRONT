import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ✅ Screens
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PromptInputScreen from '../screens/shorts/31-PromptInputScreen';
import ImageSelectionScreen from '../screens/shorts/32-ImageSelectionScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';
import ResultScreen from '../screens/common/ResultScreen';
import PostVideoScreen from '../screens/common/PostVideoScreen';
import SubtitlesSettingScreen from '../screens/common/SubtitlesSettingScreen'; // ✅ 자막 설정 화면 import

// ✅ Stack Param 타입 정의
export type ShortsStackParamList = {
  SelectDurationScreen: {mode: 'shorts' | 'photo'};
  PromptInputScreen: {duration: number};
  ImageSelectionScreen: {
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    videos?: string[];
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
  MusicSelectionScreen: {
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
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
    videos: string[];
    subtitles: string[];
    music?: string;
  };
  PostVideoScreen: {
    finalVideoUrl: string;
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
      <Stack.Screen
        name="SubtitlesSettingScreen"
        component={SubtitlesSettingScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="PostVideoScreen" component={PostVideoScreen} />
    </Stack.Navigator>
  );
};

export default ShortsNavigator;
