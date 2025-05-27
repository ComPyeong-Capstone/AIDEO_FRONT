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
    marginBottom: scaleSize(11),
  },
  header: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: scaleFont(21),
  },
  headerIconButton: {
    backgroundColor: COLORS.background,
    padding: scaleSize(10),
    borderRadius: scaleSize(10),
  },
  videoContainer: {
    backgroundColor: COLORS.videocontainer,
    borderRadius: scaleSize(22),
    alignItems: 'center',
    paddingBottom: scaleSize(5),
    marginBottom: scaleSize(2),
  },
  thumbnailPlaceholder: {
    width: '100%',
  aspectRatio: 9 / 12,
    backgroundColor: COLORS.thumbnail,
    borderTopLeftRadius: scaleSize(22),
    borderTopRightRadius: scaleSize(22),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: scaleSize(3),
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
    marginTop: scaleSize(3),
  },
  profileImage: {
    width: scaleSize(22),
    height: scaleSize(22),
    borderRadius: scaleSize(22),
    backgroundColor: COLORS.maincolor,
    marginRight: scaleSize(5),
  },
  creator: {
    color: COLORS.maincolor,
    fontSize: scaleFont(14),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingBottom: scaleSize(1),
    paddingHorizontal: scaleSize(8),
  },
});
