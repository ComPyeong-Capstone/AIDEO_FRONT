import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigator/AppNavigator';
import {UserProvider} from './src/context/UserContext';
import {ThemeProvider} from './src/context/ThemeContext';
import {VideoGenerationProvider} from './src/context/VideoGenerationContext';
import {GenerateProvider} from './src/context/GenerateContext';
import SplashScreen from 'react-native-splash-screen';
import {configureGoogleSignin} from './src/config/googleSignin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';

const App = () => {
  console.log('WEB_CLIENT_ID:', WEB_CLIENT_ID);

  useEffect(() => {
    configureGoogleSignin({
      iosClientId: IOS_CLIENT_ID,
      webClientId: WEB_CLIENT_ID,
    });

    const timeout = setTimeout(() => {
      if (SplashScreen?.hide) {
        SplashScreen.hide();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <UserProvider>
      <ThemeProvider>
        <VideoGenerationProvider>
          <GenerateProvider>
            {/* ✅ 이미지/자막 생성 전역 상태 관리 */}
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </GenerateProvider>
        </VideoGenerationProvider>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
