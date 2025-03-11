import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ✅ 홈 스크린 추가
import HomeScreen from '../screens/bottomtab/1000-HomeScreen';

// ✅ Shorts Screens 추가
import ShortsVideoScreen from '../screens/shorts/VideoLengthScreen';
import PromptInputScreen from '../screens/shorts/3210-PromptInputScreen';
import ImageSelectionScreen from '../screens/shorts/3220-ImageSelectionScreen';
import FinalVideoScreen from '../screens/shorts/3230-FinalVideoScreen';
import MusicSelectionScreen from '../screens/shorts/3231-MusicSelectionScreen';
import PostVideoScreen from '../screens/shorts/3250-PostVideoScreen';
import ResultScreen from '../screens/shorts/3240-ResultScreen';

const Stack = createStackNavigator();

const ShortsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ShortsVideoScreen" component={ShortsVideoScreen} />
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
