import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors';

const {width, height} = Dimensions.get('window');

const IMAGE_WIDTH = width * 0.75;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  // ✅ 상단 내비게이션 버튼
  navButtonLeft: {
    position: 'absolute',
    top: scaleSize(12),
    left: scaleSize(16),
    padding: scaleSize(8),
    zIndex: 20,
  },
  navButtonRight: {
    position: 'absolute',
    top: scaleSize(12),
    right: scaleSize(16),
    padding: scaleSize(8),
    zIndex: 20,
  },
  navIcon: {
    fontSize: scaleFont(28),
    color: COLORS.primary,
  },

  // ✅ 진행바
  progressBarWrapper: {
    marginTop: scaleSize(40),
    width: '100%',
    paddingHorizontal: '5%',
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
    color: COLORS.textSecondary,
  },
  progressLine: {
    height: scaleSize(2),
    backgroundColor: COLORS.primary,
    flex: 1,
    marginHorizontal: scaleSize(6),
  },

  // ✅ 이미지 슬라이더
  sliderWrapper: {
    marginTop: height * 0.045,
    height: IMAGE_HEIGHT + scaleSize(30),
    width: '100%',
    alignItems: 'center',
  },
  swiperContainer: {
    width: '100%',
  },
  imageBox: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(10),
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // ✅ 페이지네이션
  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(12),
  },

  // ✅ 자막 입력
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

  // ✅ 하단 버튼
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

  // ✅ 로딩 오버레이
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
});
