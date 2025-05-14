import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigator/AppNavigator';
import {UserProvider} from './src/context/UserContext';
import SplashScreen from 'react-native-splash-screen';
import {configureGoogleSignin} from './src/config/googleSignin';
import {ThemeProvider} from './src/context/ThemeContext';
import {VideoGenerationProvider} from './src/context/VideoGenerationContext'; // ✅ 추가

const App = () => {
  useEffect(() => {
//    configureGoogleSignin();

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
          {/* ✅ 전역 상태 Provider 추가 */}
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </VideoGenerationProvider>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
