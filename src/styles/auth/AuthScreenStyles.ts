// src/styles/auth/AuthScreenStyles.ts
import {StyleSheet} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleSize(20),
  },
  title: {
    fontSize: scaleFont(28),
    //color: '#fff',
    fontWeight: 'bold',
    marginBottom: scaleSize(30),
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: scaleSize(15),
    borderRadius: scaleSize(8),
    marginBottom: scaleSize(15),
  },
  button: {
    backgroundColor: '#51BCB4',
    padding: scaleSize(15),
    borderRadius: scaleSize(8),
    width: '100%',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  switchText: {
    color: '#ccc',
    marginTop: scaleSize(20),
  },
});
