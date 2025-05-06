import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../styles/colors';
import {scaleSize, scaleFont} from '../../styles/responsive';

const {width} = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: scaleSize(60), // 진행바 아래 여백
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
    marginHorizontal: (width - IMAGE_WIDTH) / 2,
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
    gap: scaleSize(20),
  },

  buttonSpacing: {
    marginHorizontal: scaleSize(8),
  },
});
