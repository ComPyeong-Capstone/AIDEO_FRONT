import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VideoLengthScreen from '../screens/photo/VideoLengthScreen';
import ResultScreen from '../screens/photo/ResultScreen';
import MyPhotoPrompth from '../screens/photo/MyPhotoPrompth';
import FinalVideoScreen from '../screens/photo/FinalVideoScreen';
import MusicSelectionScreen from '../screens/photo/MusicSelectionScreen';

// ✅ PhotoAI Screens 추가


const Stack = createStackNavigator();

const PhotoNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="VideoLengthScreen" component={VideoLengthScreen} />
      <Stack.Screen name="MyPhotoPrompth" component={MyPhotoPrompth} />
      <Stack.Screen name="FinalVideoScreen" component={FinalVideoScreen} />
      <Stack.Screen name="MusicSelectionScreen" component={MusicSelectionScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />

       
       
       
        </Stack.Navigator>
  );
};


export default PhotoNavigator;


