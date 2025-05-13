import { useColorScheme } from 'react-native';
import { DarkColors, LightColors } from '../styles/colors';

export const useThemeColors = () => {
  const scheme = useColorScheme();

  // 혹시 scheme이 null인 경우 기본값 fallback
  if (scheme === 'dark') return DarkColors;
  if (scheme === 'light') return LightColors;

  return LightColors; // ✅ fallback
};
