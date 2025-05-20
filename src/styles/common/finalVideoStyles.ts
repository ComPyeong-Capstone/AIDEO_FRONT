import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

const {width} = Dimensions.get('window');

const VIDEO_WIDTH = width * 0.75;
const VIDEO_HEIGHT = VIDEO_WIDTH * (16 / 9) + scaleSize(20);

export default StyleSheet.create({
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

  navIcon: {
    fontSize: scaleFont(24),
    color: COLORS.primary,
    paddingHorizontal: scaleSize(4),
  },

  imageNumberText: {
    fontSize: scaleFont(15),
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },

  sliderContainer: {
    width: '100%',
    marginTop: scaleSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoWrapper: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    borderWidth: scaleSize(2),
    borderColor: COLORS.primary,
    borderRadius: scaleSize(10),
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },

  videoItem: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  videoPlayer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },

  videoText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: COLORS.buttonText,
    textAlign: 'center',
    marginBottom: scaleSize(10),
  },

  swiperContainer: {
    width: '100%',
    height: '100%',
  },

  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(12),
  },

  dot: {
    width: scaleSize(8),
    height: scaleSize(8),
    borderRadius: scaleSize(4),
    marginHorizontal: scaleSize(4),
  },

  dotActive: {
    backgroundColor: COLORS.primary,
  },

  dotInactive: {
    backgroundColor: '#ccc',
  },

  pagination: {
    display: 'none',
  },

  customPagination: {
    display: 'none',
  },

  musicSpacing: {
    height: scaleSize(10),
  },

  musicButton: {
    height: scaleSize(40),
    width: '75%',
    borderRadius: scaleSize(10),
    borderWidth: scaleSize(2),
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },

  musicLabel: {
    fontSize: scaleFont(14),
    color: COLORS.textSecondary,
    marginTop: scaleSize(6),
    textAlign: 'center',
  },

  buttonText: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    color: COLORS.buttonText,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: scaleSize(16),
  },

  prevButton: {
    backgroundColor: '#ccc',
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(20),
    width: '45%',
    alignItems: 'center',
  },

  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(20),
    width: '45%',
    alignItems: 'center',
  },
  titleCenterWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
