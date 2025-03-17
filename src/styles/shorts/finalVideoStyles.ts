import {StyleSheet} from 'react-native';
import {scaleSize} from '../responsive'; // ✅ 반응형 크기 조정 함수 가져오기

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressLine: {
    width: scaleSize(40),
    height: 2,
    backgroundColor: '#51BCB4',
    marginHorizontal: scaleSize(5),
  },
  progressDotActive: {
    color: '#51BCB4',
    fontSize: scaleSize(18),
  },
  progressDotInactive: {
    color: '#888',
    fontSize: scaleSize(18),
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
    borderWidth: 2,
    borderColor: '#51BCB4',
  },
  arrowButton: {
    padding: scaleSize(15),
  },
  arrowText: {
    color: '#51BCB4',
  },
  musicButton: {
    borderColor: '#51BCB4',
    borderWidth: 2,
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(15),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: scaleSize(30),
    position: 'absolute',
    bottom: scaleSize(20),
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
    color: '#1F2C3D',
  },
  videoText: {
    color: '#1F2C3D', // ✅ 텍스트 색상
    fontWeight: 'bold', // ✅ 볼드 적용
    textAlign: 'center', // ✅ 중앙 정렬
  },
});
