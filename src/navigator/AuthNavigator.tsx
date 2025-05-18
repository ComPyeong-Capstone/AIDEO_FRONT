import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from '../screens/auth/AuthScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import GoogleSignupScreen from '../screens/auth/GoogleSignupScreen';
import KakaoLoginWebViewScreen from '../screens/auth/KakaoLoginWebViewScreen';
import KakaoSignupScreen from '../screens/auth/KakaoSignupScreen';
import {RootStackParamList} from '../types/navigation';
//import GoogleSignupScreen from '../screens/auth/GoogleSignupScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={AuthScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="GoogleSignup" component={GoogleSignupScreen} />
      <Stack.Screen
        name="KakaoLoginWebView"
        component={KakaoLoginWebViewScreen}
      />
      <Stack.Screen name="KakaoSignup" component={KakaoSignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
