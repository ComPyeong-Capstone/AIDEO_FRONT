import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

// ✅ 현재 화면 크기 가져오기
const {width, height} = Dimensions.get('window');

// ✅ 반응형 크기 조정 함수
const scaleSize = (size: number) => (size * width) / 375;
const scaleFont = (size: number) => (size * width) / 375;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleSize(20),
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: scaleSize(40),
    top: scaleSize(40),
  },
  progressLine: {
    height: scaleSize(2),
    backgroundColor: '#51BCB4',
    flex: 1,
    marginHorizontal: scaleSize(5),
  },
  progressDotActive: {
    color: '#51BCB4',
    fontSize: scaleFont(18),
  },
  progressDotInactive: {
    color: '#888',
    fontSize: scaleFont(18),
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(80),
  },
  imageItem: {
    width: width * 0.5,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(10),
    borderWidth: scaleSize(2),
    borderColor: '#51BCB4',
  },
  imageText: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    color: '#1F2C3D',
  },
  arrowButton: {
    padding: scaleSize(20),
  },
  arrowText: {
    fontSize: scaleFont(24),
    color: '#51BCB4',
  },
  captionBox: {
    width: '90%',
    height: scaleSize(50),
    borderColor: '#51BCB4',
    borderWidth: scaleSize(2),
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(20),
  },
  captionText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: scaleSize(30),
    position: 'absolute',
    bottom: scaleSize(50),
  },
  button: {
    alignItems: 'center',
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(20),
    width: '45%',
  },
  prevButton: {
    backgroundColor: '#ccc',
  },
  nextButton: {
    backgroundColor: '#51BCB4',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    color: '#1F2C3D',
  },
});
