import {Dimensions, PixelRatio} from 'react-native';

// 📌 기준 화면 크기 (iPhone 16: 430px)
const BASE_WIDTH = 430;
const {width} = Dimensions.get('window');

// 📌 `width`를 매개변수로 받을 수도 있도록 설정
export const scaleSize = (
  size: number,
  screenWidth: number = width,
): number => {
  const scaleFactor = screenWidth / BASE_WIDTH;
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

// 📌 폰트 크기 조정 함수 (가독성 유지)
export const scaleFont = (
  size: number,
  screenWidth: number = width,
): number => {
  return PixelRatio.roundToNearestPixel(
    size * (screenWidth / BASE_WIDTH) * 0.9,
  );
};
