// src/styles/auth/KakaoSignupScreenStyles.ts

import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

export const kakaoSignupStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleSize(20),
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: scaleSize(24),
    color: COLORS.textPrimary,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scaleSize(8),
    padding: scaleSize(14),
    fontSize: scaleFont(16),
    marginBottom: scaleSize(20),
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FEE500',
    paddingVertical: scaleSize(14),
    paddingHorizontal: scaleSize(40),
    borderRadius: scaleSize(8),
  },
  buttonText: {
    color: '#000',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});
