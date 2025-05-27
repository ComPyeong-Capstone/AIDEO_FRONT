// src/styles/bottomtab/1000-homeStyles.ts

import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {ThemeColorsType} from '../../types/theme'; // 타입 정의
import {COLORS} from '../../styles/colors';

// COLORS를 파라미터로 받아야 다크모드 반영 가능!
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleSize(16),
    marginBottom: scaleSize(12),
  },
  header: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: scaleFont(20),
  },
  headerIconButton: {
    backgroundColor: COLORS.background,
    padding: scaleSize(10),
    borderRadius: scaleSize(10),
  },
  videoContainer: {
    backgroundColor: COLORS.videocontainer,
    borderRadius: scaleSize(23),
    alignItems: 'center',
    paddingBottom: scaleSize(9),
    marginBottom: scaleSize(6),
  },
  thumbnailPlaceholder: {
    width: '100%',
    aspectRatio: 9 / 11, // ✅ 세로 비율로 수정
    backgroundColor: COLORS.thumbnail,
    borderTopLeftRadius: scaleSize(12),
    borderTopRightRadius: scaleSize(12),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.maincolor,
    textAlign: 'center',
    fontSize: scaleFont(16),
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(9),
  },
  profileImage: {
    width: scaleSize(24),
    height: scaleSize(24),
    borderRadius: scaleSize(12),
    backgroundColor: COLORS.maincolor,
    marginRight: scaleSize(10),
  },
  creator: {
    color: COLORS.maincolor,
    fontSize: scaleFont(14),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingBottom: scaleSize(0),
    paddingHorizontal: scaleSize(13),
  },
});
