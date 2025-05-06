import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../../styles/colors';

const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // 진행바 위치 설정
  progressBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: scaleSize(10),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    zIndex: 10,
  },

  // 프롬프트 입력 필드 포함하는 영역
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scaleSize(20),
  },

  inputContainer: {
    borderWidth: scaleSize(2),
    borderColor: COLORS.primary,
    borderRadius: scaleSize(10),
    width: '100%',
    height: height * 0.25,
    paddingHorizontal: scaleSize(12),
    justifyContent: 'center',
  },

  input: {
    width: '100%',
    height: '100%',
    color: COLORS.primary,
    fontSize: scaleFont(16),
    textAlignVertical: 'top',
    padding: scaleSize(10),
  },

  // 하단 버튼 컨테이너
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scaleSize(30),
    paddingHorizontal: scaleSize(20),
  },

  // 로딩 오버레이
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  // 로딩 박스
  loadingBox: {
    backgroundColor: '#333',
    padding: scaleSize(20),
    borderRadius: scaleSize(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleSize(10),
  },

  // 로딩 텍스트
  loadingText: {
    marginTop: scaleSize(5),
    color: '#fff',
    fontSize: scaleFont(14),
  },
});
