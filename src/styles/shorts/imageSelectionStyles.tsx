import {StyleSheet} from 'react-native';
import {scaleSize} from '../responsive'; // ✅ 반응형 함수 가져오기
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: '10%',
  },
  progressLine: {
    height: 2,
    backgroundColor: '#51BCB4',
    flex: 1,
    marginHorizontal: '2%',
  },
  progressDotActive: {
    color: '#51BCB4',
  },
  progressDotInactive: {
    color: '#888',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(80),
  },
  imageItem: {
    width: scaleSize(200),
    height: scaleSize(250),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(10),
    borderWidth: 2,
    borderColor: '#51BCB4',
  },
  imageText: {
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
  arrowButton: {
    padding: scaleSize(20),
  },
  arrowText: {
    fontSize: scaleSize(24),
    color: '#51BCB4',
  },
  captionBox: {
    width: '90%',
    height: scaleSize(50),
    borderColor: '#51BCB4',
    borderWidth: 2,
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(20),
  },
  captionText: {
    fontSize: scaleSize(16),
    fontWeight: 'bold',
    color: '#51BCB4',
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
    color: '#1F2C3D',
  },
});
