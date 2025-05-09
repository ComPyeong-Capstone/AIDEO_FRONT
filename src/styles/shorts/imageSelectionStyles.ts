import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors';

const {width, height} = Dimensions.get('window');

// 이미지 크기 비율
const IMAGE_WIDTH = width * 0.75;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    top: scaleSize(12),
    left: scaleSize(16),
    zIndex: 20,
  },

  progressBarWrapper: {
    marginTop: scaleSize(40),
    width: '100%',
    zIndex: 10,
    paddingHorizontal: '5%',
    backgroundColor: COLORS.background,
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
    height: 2,
    backgroundColor: COLORS.primary,
    flex: 1,
    marginHorizontal: '2%',
  },

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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  imageText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
  },

  // Swiper 기본 pagination 제거용 (안 쓰이지만 안전하게 유지)
  pagination: {
    display: 'none',
  },

  // 커스텀 페이지 점 스타일
  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(12),
  },

  // 페이지 점에 간격 부여를 위한 래퍼
  paginationDotWrapper: {
    marginHorizontal: scaleSize(4),
  },

  captionBox: {
    width: '90%',
    height: scaleSize(60),
    borderColor: COLORS.primary,
    borderWidth: scaleSize(2),
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleSize(10),
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
});
