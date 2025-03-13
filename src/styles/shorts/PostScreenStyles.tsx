import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

// ✅ 현재 화면 크기 가져오기
const {width} = Dimensions.get('window');

// ✅ 반응형 크기 조정 함수
const scaleSize = (size: number) => (size * width) / 375;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#51BCB4',
    borderWidth: 2,
    borderRadius: scaleSize(10),
    marginVertical: scaleSize(10),
  },
  videoText: {
    color: '#51BCB4',
    fontWeight: 'bold',
    fontSize: scaleSize(18),
  },
  input: {
    borderColor: '#51BCB4',
    borderWidth: 1,
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    color: '#51BCB4',
    marginVertical: scaleSize(8),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleSize(10),
  },
  exitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    borderRadius: scaleSize(10),
    width: width * 0.4,
    height: scaleSize(45),
  },
  postButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(10),
    width: width * 0.4,
    height: scaleSize(45),
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1F2C3D',
    fontSize: scaleSize(16),
  },
});
