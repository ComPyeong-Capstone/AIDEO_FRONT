import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ✅ Shorts Screens
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PromptInputScreen from '../screens/shorts/3210-PromptInputScreen';
import ImageSelectionScreen from '../screens/shorts/3220-ImageSelectionScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';
import ResultScreen from '../screens/common/ResultScreen';

// ✅ Stack Navigator 타입 정의
export type ShortsStackParamList = {
  SelectDurationScreen: {mode: 'shorts' | 'photo'}; // ✅ 수정됨
  PromptInputScreen: {duration: number};
  ImageSelectionScreen: {
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
  };
  FinalVideoScreen: {
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
  };
  MusicSelectionScreen: undefined;
  ResultScreen: undefined;
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
