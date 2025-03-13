import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

// ✅ 현재 화면 크기 가져오기
const {width} = Dimensions.get('window');

// ✅ 반응형 크기 조정 함수
const scaleSize = (size: number) => (size * width) / 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleSize(20),
  },
  resultBox: {
    width: width * 0.9,
    height: width * 0.6,
    backgroundColor: '#2A3B4F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(12),
    marginBottom: scaleSize(30),
  },
  resultText: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(12),
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(24),
    width: width * 0.7,
    marginBottom: scaleSize(20),
  },
  buttonText: {
    color: 'white',
    fontSize: scaleSize(16),
    fontWeight: 'bold',
    marginLeft: scaleSize(8),
  },
  smallButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.7,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleSize(10),
    borderRadius: scaleSize(8),
    marginRight: scaleSize(10),
  },
  exitButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleSize(10),
    borderRadius: scaleSize(8),
  },
  smallButtonText: {
    color: 'white',
    fontSize: scaleSize(14),
    fontWeight: 'bold',
  },
});

export default styles;
