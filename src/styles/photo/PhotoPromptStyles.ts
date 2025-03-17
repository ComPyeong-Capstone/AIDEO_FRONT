import {StyleSheet, Dimensions} from 'react-native';

// ✅ 현재 화면 크기 가져오기
const {width} = Dimensions.get('window');

// ✅ 크기 조정 (이미지 크기를 줄이기)
const IMAGE_WIDTH = width * 0.4; // 기존 70% → 55% 로 축소
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9); // 9:16 비율 유지

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center', // ✅ 전체 컨텐츠를 가운데 정렬
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  progressDotActive: {
    color: '#51BCB4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressDotInactive: {
    color: '#aaa',
    fontSize: 18,
  },
  progressLine: {
    width: 20,
    height: 2,
    backgroundColor: '#aaa',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  sliderWrapper: {
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center', // ✅ 슬라이더를 중앙 정렬
    marginVertical: 20,
  },
  imageItem: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: '#51BCB4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // ✅ 개별 이미지도 중앙 정렬
  },
  imageText: {
    fontSize: 18, // ✅ 기존보다 조금 줄임
    fontWeight: 'bold',
    color: '#fff',
  },
  captionBox: {
    padding: 8, // ✅ 패딩 줄임
    backgroundColor: '#273647',
    borderRadius: 10,
    marginBottom: 15, // ✅ 마진 줄임
  },
  captionText: {
    fontSize: 14, // ✅ 기존보다 폰트 크기 줄임
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 25, // ✅ 마진 줄임
  },
  button: {
    backgroundColor: '#51BCB4',
    padding: 8, // ✅ 패딩 줄임
    borderRadius: 10,
    marginHorizontal: 8, // ✅ 마진 줄임
  },
  buttonText: {
    fontSize: 14, // ✅ 기존보다 폰트 크기 줄임
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
});
