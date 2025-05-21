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
import YouTubeUploadScreen from '../screens/common/YoutubeUploadScreen'; // 경로 맞게 수정

import {useUser} from '../context/UserContext';
import {useGenerate} from '../context/GenerateContext';
import CustomButton from '../styles/button';
import {AppStackParamList} from './types';
import {styles} from '../styles/common/globalModalStyles';

// ✅ 외부에서 접근할 수 있는 navigationRef
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
      if (resultData.videos && resultData.videos.length > 0) {
        // ✅ 영상까지 생성된 경우: FinalVideoScreen으로 이동
        navigationRef.navigate('ShortsStack', {
          screen: 'FinalVideoScreen',
          params: {
            from: 'shorts',
            prompt: resultData.prompt,
            duration: resultData.duration,
            imageUrls: resultData.imageUrls,
            subtitles: resultData.subtitles,
            videos: resultData.videos,
          },
        });
      } else {
        // ✅ 영상 없으면: ImageSelectionScreen으로 이동
        navigationRef.navigate('ShortsStack', {
          screen: 'ImageSelectionScreen',
          params: {
            prompt: resultData.prompt,
            duration: resultData.duration,
            imageUrls: resultData.imageUrls,
            subtitles: resultData.subtitles,
          },
        });
      }

      clearResult(); // ✅ 전역 상태 초기화
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
            <Stack.Screen
              name="URLPosting"
              component={URLPosting}
              initialParams={{
                finalVideoUrl: '',
                title: '',
                tags: '',
              }}
            />

            {/* ✅ 초기 파라미터 설정 */}
            <Stack.Screen
              name="FilePosting"
              component={FilePosting}
              initialParams={{
                finalVideoUrl: null,
                title: '',
                tags: '',
              }}
            />
            <Stack.Screen
              name="YouTubeUploadScreen" // ✅ 여기가 없어서 에러 발생했던 것
              component={YouTubeUploadScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>

      {/* ✅ 전역 완료 모달 */}
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
