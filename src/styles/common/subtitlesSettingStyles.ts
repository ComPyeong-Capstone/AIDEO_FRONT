// styles/common/subtitlesSettingStyles.ts

import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(40), // 버튼 포함 시 여유 여백
  },
  row: {
    marginBottom: scaleSize(16),
  },
  label: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    marginBottom: scaleSize(6),
    color: COLORS.black,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: scaleSize(8),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    height: scaleSize(44), // 드롭다운 높이 줄이기
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: scaleSize(30),
    marginBottom: scaleSize(20),
  },
});
