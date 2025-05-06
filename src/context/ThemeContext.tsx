// src/context/ThemeContext.tsx
import React, {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {DarkColors, LightColors} from '../styles/colors';

const defaultTheme: ThemeColorsType = LightColors; // 안전한 기본값
export const ThemeContext = createContext<ThemeColorsType>(defaultTheme);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const scheme = useColorScheme();

  const theme = scheme === 'dark' ? DarkColors : LightColors;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useThemeColors = () => useContext(ThemeContext);
