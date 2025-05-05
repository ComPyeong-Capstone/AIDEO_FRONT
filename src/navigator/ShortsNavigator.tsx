import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ✅ Shorts Screens 추가
import SelectDurationScreen from '../screens/shorts/3200-SelectDurationScreen'; // 새로 추가된 화면
import PromptInputScreen from '../screens/shorts/3210-PromptInputScreen';
import ImageSelectionScreen from '../screens/shorts/3220-ImageSelectionScreen';
import FinalVideoScreen from '../screens/shorts/3230-FinalVideoScreen';
import MusicSelectionScreen from '../screens/shorts/3231-MusicSelectionScreen';
import ResultScreen from '../screens/shorts/3240-ResultScreen';

// ✅ Stack Navigator 타입 정의
export type ShortsStackParamList = {
  SelectDurationScreen: undefined;
  PromptInputScreen: {duration: number}; // ✅ duration을 파라미터로 받도록 변경
  ImageSelectionScreen: undefined;
  FinalVideoScreen: undefined;
  MusicSelectionScreen: undefined;
  PostVideoScreen: undefined;
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
