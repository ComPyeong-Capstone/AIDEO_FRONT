import {StyleSheet} from 'react-native';
import {COLORS} from '../../styles/colors';
import {scaleSize, scaleFont} from '../../styles/responsive';

const IMAGE_WIDTH = scaleSize(270); // 기준 너비의 70%
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ✅ 전체 콘텐츠 가운데 정렬을 위한 wrapper
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: scaleSize(50), // 진행바와의 간격 확보 (SafeArea 위에 있으므로)
  },

  wrapper: {},

  swiperContainer: {
    width: '100%',
    alignSelf: 'center',
  },

  pagination: {
    bottom: scaleSize(10),
  },

  slide: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: scaleSize(10),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.imagebox,
    marginHorizontal: (scaleSize(390) - IMAGE_WIDTH) / 2,
    marginTop: scaleSize(20),
  },

  image: {
    width: '100%',
    height: '100%',
  },

  addButton: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(10),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    fontSize: scaleFont(28),
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  promptInput: {
    width: '80%',
    height: scaleSize(40),
    borderColor: COLORS.primary,
    borderWidth: scaleSize(1.5),
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(12),
    marginTop: scaleSize(30),
    fontSize: scaleFont(16),
    color: COLORS.textPrimary,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: scaleSize(60),
    justifyContent: 'center',
    columnGap: scaleSize(90),
  },

  buttonSpacing: {
    marginHorizontal: scaleSize(8),
  },
});
