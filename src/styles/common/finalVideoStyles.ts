import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

const {width} = Dimensions.get('window');

const VIDEO_WIDTH = width * 0.75;
const VIDEO_HEIGHT = VIDEO_WIDTH * (16 / 9) + scaleSize(20); // 여유 높이 포함

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  topNavWrapper: {
    marginTop: scaleSize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scaleSize(16),
    zIndex: 10,
  },

  arrowText: {
    fontSize: scaleFont(24),
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  progressBarWrapper: {
    marginTop: scaleSize(12),
    width: '100%',
    alignItems: 'center',
    paddingVertical: scaleSize(4),
    paddingHorizontal: width * 0.05,
    backgroundColor: COLORS.background,
    zIndex: 5,
  },

  sliderContainer: {
    width: '100%',
    marginTop: scaleSize(20),
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

  pagination: {
    display: 'none', // ✅ Swiper 내부 pagination 제거
  },

  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(12), // ✅ 외부 dot 표시 복원
  },

  progressDotActive: {
    fontSize: scaleFont(18),
    color: COLORS.primary,
  },

  progressDotInactive: {
    fontSize: scaleFont(18),
    color: '#888',
  },

  musicSpacing: {
    height: scaleSize(10), // 여백 줄임
  },

  musicButton: {
    height: scaleSize(40),
    width: '75%',
    borderRadius: scaleSize(10),
    borderWidth: scaleSize(2),
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10), // 위로 올림
  },

  musicLabel: {
    fontSize: scaleFont(14),
    color: COLORS.textSecondary,
    marginTop: scaleSize(6), // 위로 올림
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
    marginTop: scaleSize(16), // 위로 올림
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
});
