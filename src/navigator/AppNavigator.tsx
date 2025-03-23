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

// Context
import {useUser} from '../context/UserContext'; // ✅ 사용자 정보 가져오기

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {user} = useUser(); // ✅ 전역 사용자 정보

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            {/* ✅ 로그인 후 메인 화면들 */}
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="ShortsStack" component={ShortsNavigator} />
            <Stack.Screen name="PhotoStack" component={PhotoNavigator} />
            <Stack.Screen
              name="ShortsPlayerScreen"
              component={ShortsPlayerScreen}
            />
          </>
        ) : (
          // ✅ 로그인 안됐으면 Auth 화면
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
