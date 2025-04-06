import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import ShortsNavigator from './ShortsNavigator';
import PhotoNavigator from './PhotoNavigator';
import ShortsPlayerScreen from '../screens/shortsPlayer/ShortsPlayerScreen';
import PostVideoScreen from '../screens/common/PostVideoScreen';
import {useUser} from '../context/UserContext';
import {AppStackParamList} from './types';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const {user} = useUser();

  // ✅ 디버깅 로그
  console.log('[AppNavigator] user:', user);

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
