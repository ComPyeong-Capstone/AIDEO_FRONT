import 'react-native-gesture-handler';
import React ,{ useEffect } from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigator/AppNavigator';
import {UserProvider} from './src/context/UserContext';
import SplashScreen from "react-native-splash-screen";

const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간
  });
  return (
    <UserProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </UserProvider>
  );
};

export default App;
