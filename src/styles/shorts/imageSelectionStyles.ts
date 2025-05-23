import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors';

const {height} = Dimensions.get('window');

// ✅ 이미지 비율 9:16 유지 + 높이 조절로 전체 보이게
const IMAGE_HEIGHT = height * 0.6;
const IMAGE_WIDTH = IMAGE_HEIGHT * (9 / 16);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'flex-start', // ✅ 위에서 아래로 정렬
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: scaleSize(8),
  },

  imageNumberText: {
    fontSize: scaleFont(16),
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: scaleSize(12),
  },

  progressBarWrapper: {
    display: 'none',
  },

  progressDotActive: {
    fontSize: scaleFont(18),
    color: COLORS.primary,
  },
  progressDotInactive: {
    fontSize: scaleFont(18),
    color: COLORS.textSecondary,
  },

  // ✅ 이미지 슬라이더 wrapper
  sliderWrapper: {
    marginTop: scaleSize(12),
    height: IMAGE_HEIGHT + scaleSize(36),
    width: '100%',
    alignItems: 'center',
  },

  swiperContainer: {
    width: '100%',
    height: '100%',
  },

  imageBox: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(12),
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // ✅ 이미지 전체 보이도록
  },

  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(8),
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
    marginTop: scaleSize(12),
  },

  captionText: {
    color: COLORS.primary,
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // ✅ 버튼은 아래쪽에 자연스럽게 배치
  buttonContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(20),
    marginBottom: scaleSize(24),
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
