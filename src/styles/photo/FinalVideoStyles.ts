import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../styles/colors';

const {width, height} = Dimensions.get('window');

// ✅ 반응형 유틸 함수
const scaleSize = (size: number) => (size * width) / 375;
const scaleFont = (size: number) => (size * width) / 375;

// ✅ 외부에서 사용할 반응형 사이즈 계산 함수
export const getVideoSizeStyle = (
  videoWidth: number,
  videoHeight: number,
  screenWidth: number,
) => ({
  width: videoWidth,
  height: videoHeight,
  marginHorizontal: (screenWidth - videoWidth) / 2,
});

const styles = StyleSheet.create({
  // ✅ 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    paddingHorizontal: scaleSize(20),
  },

  // ✅ 진행바 스타일
  progressContainer: {
    position: 'absolute',
    top: scaleSize(10),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  progressDotActive: {
    color: COLORS.primary,
    fontSize: scaleFont(18),
  },
  progressDotInactive: {
    color: COLORS.dotInactive,
    fontSize: scaleFont(18),
  },
  progressLine: {
    height: scaleSize(2),
    backgroundColor: COLORS.primary,
    width: scaleSize(40),
    marginHorizontal: scaleSize(5),
  },

  // ✅ 슬라이더
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(100),
    marginBottom: scaleSize(30),
  },
  swiperBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.35 + scaleSize(40),
  },
  swiperContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  pagination: {
    bottom: -scaleSize(20),
  },

  // ✅ 동영상 카드
  videoItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.imagebox,
    borderRadius: scaleSize(10),
    borderWidth: scaleSize(2),
  },
  videoText: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    color: COLORS.textPrimary,
    textAlign: 'center',
  },

  // ✅ 슬라이드 화살표
  arrowButton: {
    padding: scaleSize(15),
  },
  arrowText: {
    fontSize: scaleFont(24),
    color: COLORS.primary,
  },

  // ✅ 배경 음악 버튼
  musicButton: {
    borderWidth: scaleSize(3),
    borderColor: COLORS.primary,
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10),
    width: width * 0.7,
    height: scaleSize(40),
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    color: COLORS.textPrimary,
  },

  // ✅ 하단 컨트롤 버튼
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    bottom: scaleSize(40),
  },
  buttonSpacing: {
    marginHorizontal: scaleSize(8),
  },
});

export default styles;
