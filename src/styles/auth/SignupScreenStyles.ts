// src/styles/auth/SignupScreenStyles.ts
import {StyleSheet} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleSize(20),
  },
  title: {
    fontSize: scaleFont(28),
    color: '#6A48E6', // 진보라 텍스트
    fontWeight: 'bold',
    marginBottom: scaleSize(30),
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: scaleSize(14),
    borderRadius: scaleSize(10),
    marginBottom: scaleSize(12),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#6A48E6',
    padding: scaleSize(14),
    borderRadius: scaleSize(10),
    width: '100%',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },

  // ✅ 추가된 뒤로가기 버튼 스타일
  backButton: {
    position: 'absolute',
    top: scaleSize(50),
    left: scaleSize(20),
    padding: scaleSize(8),
    zIndex: 10,
  },
  backButtonText: {
    fontSize: scaleFont(14),
    color: '#6A48E6',
  },
});
