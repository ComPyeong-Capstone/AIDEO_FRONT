import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

// ✅ 현재 화면 크기 가져오기
const {width} = Dimensions.get('window');

// ✅ 반응형 크기 조정 함수
const scaleSize = (size: number) => (size * width) / 375;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#51BCB4',
    marginVertical: scaleSize(10),
    paddingVertical: scaleSize(10),
    borderRadius: scaleSize(12),
    paddingHorizontal: scaleSize(12),
  },
  musicText: {
    color: '#51BCB4',
    fontSize: scaleSize(18),
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10),
    borderRadius: scaleSize(12),
    width: width * 0.5, // ✅ 인라인 스타일 제거 & 스타일에 추가
    height: scaleSize(45), // ✅ 인라인 스타일 제거 & 반응형 적용
  },
  selectButtonText: {
    color: '#51BCB4',
    fontWeight: 'bold',
    fontSize: scaleSize(16),
  },
  prevButton: {
    marginTop: scaleSize(20),
    borderWidth: 1,
    borderColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(12),
    width: width * 0.5, // ✅ 인라인 스타일 제거 & 반응형 적용
    height: scaleSize(45), // ✅ 인라인 스타일 제거 & 반응형 적용
  },
  buttonText: {
    color: '#51BCB4',
    fontWeight: 'bold',
    fontSize: scaleSize(16),
  },
});
