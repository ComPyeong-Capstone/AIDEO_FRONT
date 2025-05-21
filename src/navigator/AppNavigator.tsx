import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Modal, View, Text} from 'react-native';

import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import ShortsNavigator from './ShortsNavigator';
import PhotoNavigator from './PhotoNavigator';

import ShortsPlayerScreen from '../screens/shortsPlayer/ShortsPlayerScreen';
import URLPosting from '../screens/common/URLPosting';
import FilePosting from '../screens/common/FilePosting';
import YouTubeUploadScreen from '../screens/common/YoutubeUploadScreen';

import {useUser} from '../context/UserContext';
import {useGenerate} from '../context/GenerateContext';

import CustomButton from '../styles/button';
import {AppStackParamList} from './types';
import {styles} from '../styles/common/globalModalStyles';

// ✅ 외부에서 네비게이션 제어를 위한 Ref
export const navigationRef = createNavigationContainerRef<AppStackParamList>();

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const {user} = useUser();
  const {isDone, resultData, clearResult} = useGenerate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isDone && resultData) {
      setShowModal(true);
    }
  }, [isDone, resultData]);

  const handleConfirm = () => {
    setShowModal(false);

    if (resultData && navigationRef.isReady()) {
      const commonParams = {
        prompt: resultData.prompt,
        duration: resultData.duration,
        imageUrls: resultData.imageUrls,
        subtitles: resultData.subtitles,
      };

      if (resultData.videos && resultData.videos.length > 0) {
        navigationRef.navigate('ShortsStack', {
          screen: 'FinalVideoScreen',
          params: {
            ...commonParams,
            from: 'shorts',
            videos: resultData.videos,
          },
        });
      } else {
        navigationRef.navigate('ShortsStack', {
          screen: 'ImageSelectionScreen',
          params: commonParams,
        });
      }

      clearResult();
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="ShortsStack" component={ShortsNavigator} />
            <Stack.Screen name="PhotoStack" component={PhotoNavigator} />
            <Stack.Screen
              name="ShortsPlayerScreen"
              component={ShortsPlayerScreen}
            />
            <Stack.Screen name="URLPosting" component={URLPosting} />
            <Stack.Screen name="FilePosting" component={FilePosting} />
            <Stack.Screen
              name="YouTubeUploadScreen"
              component={YouTubeUploadScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>

      {showModal && (
        <Modal transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <Text style={styles.title}>생성 완료</Text>
              <Text style={styles.message}>
                이미지와 자막 생성이 완료되었습니다.
              </Text>
              <CustomButton title="확인" onPress={handleConfirm} />
            </View>
          </View>
        </Modal>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
