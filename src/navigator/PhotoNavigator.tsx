import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ✅ Screens
import SelectDurationScreen from '../screens/common/SelectDurationScreen';
import PhotoPromptScreen from '../screens/photo/PhotoPromptScreen';
import FinalVideoScreen from '../screens/common/FinalVideoScreen';
import MusicSelectionScreen from '../screens/common/MusicSelectionScreen';
import SubtitlesSettingScreen from '../screens/common/SubtitlesSettingScreen';
import EffectPreviewScreen from '../screens/common/EffectPreviewScreen';
import ResultScreen from '../screens/common/ResultScreen';
import URLPosting from '../screens/common/URLPosting';

// ✅ ImageItem 타입 정의
type ImageItem = {
  id: string;
  uri: string | null;
  name?: string;
};

// ✅ Stack Param 타입 정의
export type PhotoStackParamList = {
  SelectDurationScreen: {mode: 'photo'};

  PhotoPromptScreen: {
    duration: number;
  };

  FinalVideoScreen: {
    from: 'photo' | 'shorts';
    prompt: string;
    images: ImageItem[];
    videos: string[];
    subtitles: string[];
    files: {
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
    previewImage: string;
    previewSubtitle: string;
  };

  EffectPreviewScreen: {
    from: 'photo';
    videos: string[];
    subtitles: string[];
    music: string;
    font_path: string;
    font_family: string;
    font_color: string;
    subtitle_y_position: 'bottom' | 'center';
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
      <Stack.Screen
        name="EffectPreviewScreen"
        component={EffectPreviewScreen}
      />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="URLPosting" component={URLPosting} />
    </Stack.Navigator>
  );
};

export default PhotoNavigator;
