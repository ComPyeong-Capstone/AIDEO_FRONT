import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResultScreen from '../screens/common/ResultScreen';
import PhotoPromptScreen from '../screens/photo/3110-PhotoPromptScreen';
import FinalVideoScreen from '../screens/photo/3120-FinalVideoScreen';
import MusicSelectionScreen from '../screens/photo/3121-MusicSelectionScreen';

// ✅ Stack Navigator 타입 정의
export type PhotoStackParamList = {
  PhotoPromptScreen: undefined;
  FinalVideoScreen: {
    prompt: string;
    images: {id: string; uri: string | null}[];
  };
  MusicSelectionScreen: undefined;
  ResultScreen: undefined;
};

// ✅ Stack Navigator 생성
const Stack = createStackNavigator<PhotoStackParamList>();

const PhotoNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
