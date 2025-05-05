import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors'; // 🎯 COLORS 가져오기

export const styles = StyleSheet.create({
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaleSize(10),
    paddingHorizontal: scaleSize(16),
    backgroundColor: COLORS.background, // ✅ 프롬프트와 동일한 배경색
    zIndex: 10,
  },
  dotActive: {
    color: '#51BCB4',
    fontSize: scaleFont(18),
  },
  dotInactive: {
    color: '#888',
    fontSize: scaleFont(18),
  },
  line: {
    height: scaleSize(2),
    backgroundColor: '#51BCB4',
    flex: 1,
    marginHorizontal: scaleSize(6),
  },
});
