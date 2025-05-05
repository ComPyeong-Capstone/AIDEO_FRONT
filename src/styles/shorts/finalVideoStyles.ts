import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../../styles/colors';

const {width, height} = Dimensions.get('window');

const VIDEO_WIDTH = width * 0.55; // ✅ 슬라이더 비율 조정
const VIDEO_HEIGHT = VIDEO_WIDTH * (16 / 9);

export default StyleSheet.create({
  // ✅ 전체 화면
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  // ✅ 상단 진행바 Wrapper
  progressBarWrapper: {
    width: '100%',
    paddingTop: scaleSize(10),
    paddingHorizontal: scaleSize(20),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    zIndex: 10,
    position: 'absolute',
    top: 0,
  },

  // ✅ 진행 점과 선
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressDotActive: {
    fontSize: scaleFont(18),
    color: '#51BCB4',
  },
  progressDotInactive: {
    fontSize: scaleFont(18),
    color: '#888',
  },
  progressLine: {
    height: scaleSize(2),
    backgroundColor: '#51BCB4',
    flex: 1,
    marginHorizontal: scaleSize(6),
  },

  // ✅ 슬라이더 영역
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: height * 0.15,
  },

  videoWrapper: {
    height: VIDEO_HEIGHT + scaleSize(30), // ✅ 점 포함 높이 여유 확보
    justifyContent: 'center',
  },

  swiperContainer: {
    width: '100%',
  },

  videoItem: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(10),
    borderWidth: 2,
    borderColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  videoText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#1F2C3D',
    textAlign: 'center',
  },

  arrowButton: {
    padding: scaleSize(15),
  },
  arrowText: {
    fontSize: scaleFont(20),
    color: '#51BCB4',
  },

  // ✅ Swiper 페이지네이션 점 스타일 (비디오 외부에 위치)
  pagination: {
    position: 'absolute',
    bottom: scaleSize(-20),
    alignSelf: 'center',
  },

  // ✅ 배경 음악 선택 버튼
  musicButton: {
    height: scaleSize(40),
    width: scaleSize(250),
    borderRadius: scaleSize(10),
    borderWidth: 2,
    borderColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(24),
  },

  buttonText: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    color: '#1F2C3D',
  },

  // ✅ 하단 버튼
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    bottom: scaleSize(30),
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
    backgroundColor: '#51BCB4',
  },
});
