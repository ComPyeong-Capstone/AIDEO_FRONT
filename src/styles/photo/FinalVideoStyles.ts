import {StyleSheet, Dimensions} from 'react-native';

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
    paddingHorizontal: scaleSize(20), // 가변적인 패딩 설정
  },
  progressContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: scaleSize(10),
  },
  progressLine: {
    width: scaleSize(40),
    height: scaleSize(2),
    backgroundColor: '#51BCB4',
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
    justifyContent: 'center',
    marginVertical: scaleSize(50),
  },
  videoItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(10),
    borderWidth: scaleSize(2),
    borderColor: '#51BCB4',
    width: width * 0.7,
    height: height * 0.35,
  },
  videoText: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    color: '#1F2C3D',
    textAlign: 'center',
  },
  arrowButton: {
    padding: scaleSize(15),
  },
  arrowText: {
    fontSize: scaleFont(24),
    color: '#51BCB4',
  },
  musicButton: {
    borderColor: '#51BCB4',
    borderWidth: scaleSize(3),
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(30),
    width: width * 0.7,
    height: scaleSize(40),
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
