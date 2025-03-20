import {StyleSheet} from 'react-native';
import {scaleSize} from '../responsive'; // ✅ 반응형 함수 가져오기
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const styles = StyleSheet.create({
  container: {
    flex: 1,
backgroundColor: COLORS.background,
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
  inputContainer: {
    borderWidth: 2,
    borderColor: '#51BCB4',
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(300),
    height: scaleSize(150),
    marginTop: scaleSize(80),
  },
  input: {
    color: '#51BCB4',
    textAlign: 'center',
    width: '100%',
    height: '100%',
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
    width: scaleSize(140),
  },
  prevButton: {
    backgroundColor: '#ccc',
    marginRight: '2%',
  },
  nextButton: {
    backgroundColor: '#51BCB4',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
});
