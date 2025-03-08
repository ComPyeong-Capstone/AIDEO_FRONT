import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// ✅ 홈 스크린 추가
import HomeScreen from '../bottomtab/HomeScreen';

// ✅ Shorts Screens 추가
import ShortsVideoScreen from '../screens/shorts/VideoLengthScreen';
import PromptInputScreen from '../screens/shorts/PromptInputScreen';
import ImageSelectionScreen from '../screens/shorts/ImageSelectionScreen';
import FinalVideoScreen from '../screens/shorts/FinalVideoScreen';
import MusicSelectionScreen from '../screens/shorts/MusicSelectionScreen';
import PostVideoScreen from '../screens/shorts/PostVideoScreen';
import ResultScreen from '../screens/shorts/ResultScreen';

const Stack = createStackNavigator();

const ShortsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShortsVideoScreen" component={ShortsVideoScreen} />
      <Stack.Screen name="PromptInputScreen" component={PromptInputScreen} />
      <Stack.Screen name="ImageSelectionScreen" component={ImageSelectionScreen} />
      <Stack.Screen name="FinalVideoScreen" component={FinalVideoScreen} />
      <Stack.Screen name="MusicSelectionScreen" component={MusicSelectionScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default ShortsNavigator;
