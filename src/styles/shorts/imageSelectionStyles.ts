import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors';

const {width, height} = Dimensions.get('window');

// ✅ 이미지 박스 크기 조금 축소
const IMAGE_WIDTH = width * 0.55;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  progressBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
    paddingTop: scaleSize(10),
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
    color: '#51BCB4',
  },
  progressDotInactive: {
    fontSize: scaleFont(18),
    color: '#888',
  },
  progressLine: {
    height: 2,
    backgroundColor: '#51BCB4',
    flex: 1,
    marginHorizontal: '2%',
  },

  sliderWrapper: {
    marginTop: height * 0.14,
    height: IMAGE_HEIGHT + scaleSize(60), // ✅ 여유 공간 확보 (pagination 아래 여백 포함)
    width: '100%',
    alignItems: 'center',
  },

  swiperContainer: {
    width: '100%',
  },

  imageBox: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: '#51BCB4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  imageText: {
    fontSize: scaleFont(18),
    color: '#fff',
    fontWeight: 'bold',
  },

  pagination: {
    marginTop: scaleSize(20), // ✅ 이미지와 점 사이 여백 추가
  },

  captionBox: {
    width: '90%',
    height: scaleSize(120), // ✅ 자막 박스 확대
    borderColor: '#51BCB4',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(24),
    paddingHorizontal: scaleSize(10),
  },

  captionText: {
    color: '#51BCB4',
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
