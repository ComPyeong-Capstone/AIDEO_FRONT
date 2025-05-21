import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors';

const {width, height} = Dimensions.get('window');

// ✅ 이미지 박스 넓게 (전체 너비의 90% 사용)
const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9); // 16:9 비율 유지

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  progressBarWrapper: {
    width: '100%',
    paddingHorizontal: scaleSize(20),
    marginTop: scaleSize(12),
  },

  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: scaleSize(6),
  },

  imageNumberText: {
    fontSize: scaleFont(16),
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'center',
  },

  sliderWrapper: {
    marginTop: height * 0.02,
    width: '100%',
    height: IMAGE_HEIGHT + scaleSize(50), // 여유 있는 높이 확보
    alignItems: 'center',
  },

  swiperContainer: {
    width: '100%',
  },

  imageBox: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(12),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scaleSize(10),
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // ✅ 이미지가 전체 높이까지 잘리지 않도록 유지
  },

  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(12),
  },

  progressDotActive: {
    fontSize: scaleFont(18),
    color: COLORS.primary,
  },

  progressDotInactive: {
    fontSize: scaleFont(18),
    color: COLORS.textSecondary,
  },

  captionBox: {
    width: '90%',
    alignSelf: 'center',
    marginTop: scaleSize(12),
  },

  captionText: {
    width: '100%',
    minHeight: scaleSize(50),
    maxHeight: scaleSize(80),
    borderColor: COLORS.primary,
    borderWidth: scaleSize(2),
    borderRadius: scaleSize(10),
    color: COLORS.primary,
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(8),
    textAlignVertical: 'top',
    textAlign: 'left',
    backgroundColor: '#fff',
  },

  captionCount: {
    alignSelf: 'flex-end',
    marginTop: scaleSize(4),
    marginRight: scaleSize(4),
    fontSize: scaleFont(12),
    color: COLORS.textSecondary,
  },

  fixedButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(14),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 10,
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
});
