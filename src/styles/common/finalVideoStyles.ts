// styles/common/finalVideoStyles.ts
import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

const {width} = Dimensions.get('window');

// ✅ 9:16 비율
const VIDEO_WIDTH = width * 0.75;
const VIDEO_HEIGHT = VIDEO_WIDTH * (16 / 9);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  // ✅ 상단 좌우 버튼은 컴포넌트에서 insets.top으로 조정
  topArrowLeft: {
    position: 'absolute',
    left: scaleSize(16),
    zIndex: 10,
    padding: scaleSize(8),
  },

  topArrowRight: {
    position: 'absolute',
    right: scaleSize(16),
    zIndex: 10,
    padding: scaleSize(8),
  },

  arrowText: {
    fontSize: scaleFont(24),
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  // ✅ 진행바 위치 최적화
  progressBarWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    paddingTop: scaleSize(4),
    paddingBottom: scaleSize(4),
    paddingHorizontal: width * 0.05,
    backgroundColor: COLORS.background,
    zIndex: 5,
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  progressDotActive: {
    fontSize: scaleFont(18),
    color: COLORS.primary,
  },

  progressDotInactive: {
    fontSize: scaleFont(18),
    color: '#888',
  },

  progressLine: {
    height: scaleSize(2),
    backgroundColor: COLORS.primary,
    flex: 1,
    marginHorizontal: scaleSize(6),
  },

  sliderContainer: {
    width: '100%',
    marginTop: scaleSize(100), // ✅ 진행바와 충분한 간격
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

  swiperContainer: {
    width: '100%',
    height: '100%',
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

  pagination: {
    position: 'absolute',
    bottom: scaleSize(-16),
    alignSelf: 'center',
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
    marginTop: scaleSize(14),
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
    position: 'absolute',
    bottom: scaleSize(24),
  },

  button: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(20),
  },

  prevButton: {
    backgroundColor: '#ccc',
  },

  nextButton: {
    backgroundColor: COLORS.primary,
  },
});
