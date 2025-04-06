// src/navigator/AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// 네비게이터
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import ShortsNavigator from './ShortsNavigator';
import PhotoNavigator from './PhotoNavigator';

// 화면
import ShortsPlayerScreen from '../screens/shortsPlayer/ShortsPlayerScreen';
import PostVideoScreen from '../screens/common/PostVideoScreen';

// 타입
import {AppStackParamList} from './types';
import {useUser} from '../context/UserContext';

// ✅ Stack에 타입 적용
const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const {user} = useUser();

  // 🔐 로그인 여부 판단 중이면 아무것도 렌더링하지 않음 (또는 로딩 화면 가능)
  if (user === undefined) return null;

  return (
    <NavigationContainer>
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
            <Stack.Screen name="PostVideoScreen" component={PostVideoScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
