import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors';

const {width, height} = Dimensions.get('window');

const IMAGE_WIDTH = width * 0.75;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9) + scaleSize(20);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: scaleSize(8),
  },

  titleAndBarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: scaleFont(24),
    color: COLORS.primary,
    paddingHorizontal: scaleSize(4),
  },

  imageNumberText: {
    fontSize: scaleFont(15),
    color: '#000',
    fontWeight: '500',
  },

  progressBarWrapper: {
    marginTop: scaleSize(4),
    width: '100%',
    paddingHorizontal: '5%',
    backgroundColor: COLORS.background,
  },

  progressDotActive: {
    fontSize: scaleFont(18),
    color: COLORS.primary,
  },
  progressDotInactive: {
    fontSize: scaleFont(18),
    color: COLORS.textSecondary,
  },

  sliderWrapper: {
    marginTop: height * 0.02,
    height: IMAGE_HEIGHT + scaleSize(30),
    width: '100%',
    alignItems: 'center',
  },

  swiperContainer: {
    width: '100%',
  },

  imageBox: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT + scaleSize(20),
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(10),
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(24),
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(12),
  },

  captionBox: {
    width: '90%',
    height: scaleSize(60),
    borderColor: COLORS.primary,
    borderWidth: scaleSize(2),
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(8),
  },

  captionText: {
    color: COLORS.primary,
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: scaleSize(40),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonSpacing: {
    width: '48%',
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  loadingBox: {
    backgroundColor: '#333',
    padding: scaleSize(20),
    borderRadius: scaleSize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: scaleSize(10),
    color: '#fff',
    fontSize: scaleFont(14),
  },

  hiddenPagination: {
    display: 'none',
    height: 0,
  },
});
