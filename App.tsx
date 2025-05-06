import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigator/AppNavigator';
import {UserProvider} from './src/context/UserContext';
import SplashScreen from 'react-native-splash-screen';
import {configureGoogleSignin} from './src/config/googleSignin';
import { useThemeColors } from '../styles/useThemeColors';
import {ThemeProvider} from './src/context/ThemeContext';

const App = () => {
  useEffect(() => {
    configureGoogleSignin();

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
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>

          </ThemeProvider>

    </UserProvider>
  );
};

export default App;
