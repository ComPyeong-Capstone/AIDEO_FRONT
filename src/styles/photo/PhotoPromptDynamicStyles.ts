// src/styles/photo/PhotoPromptDynamicStyles.ts
import {ViewStyle} from 'react-native';
import {COLORS} from '../colors';
import {scaleSize} from '../responsive';

export const progressBarWrapperWithTop = (top: number): ViewStyle => ({
  position: 'absolute',
  top,
  width: '100%',
  alignItems: 'center',
  paddingHorizontal: scaleSize(16),
  paddingTop: scaleSize(10),
  backgroundColor: COLORS.background,
  zIndex: 10,
});

export const fixedButtonWrapperWithPadding = (bottom: number): ViewStyle => ({
  position: 'absolute',
  bottom,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: COLORS.background,
  paddingHorizontal: scaleSize(16),
  paddingVertical: scaleSize(14),
  borderTopWidth: 1,
  borderTopColor: '#eee',
  zIndex: 10,
});
