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

  // ✅ 진행바 (노치 아래)
  progressBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingTop: scaleSize(8),
    paddingHorizontal: width * 0.05,
    backgroundColor: COLORS.background,
    zIndex: 10,
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

  // ✅ 영상 슬라이더 컨테이너
  sliderContainer: {
    width: '100%',
    marginTop: scaleSize(70),
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
    backgroundColor: '#000', // 영상 로딩 중에도 배경 보이게
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

  videoText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: COLORS.buttonText,
    textAlign: 'center',
    marginBottom: scaleSize(10),
  },

  videoPlayer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000', // 영상 내부 영역도 까맣게
  },

  arrowButton: {
    padding: scaleSize(15),
  },

  arrowText: {
    fontSize: scaleFont(20),
    color: COLORS.primary,
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
