import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../../styles/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ✅ 공통 진행바 Wrapper (노치 아래 고정)
  progressBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingTop: scaleSize(10),
    paddingHorizontal: width * 0.05,
    backgroundColor: COLORS.background,
    zIndex: 10,
  },

  // ✅ 콘텐츠 전체 정렬 + 양옆 패딩
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    width: '100%',
  },

  // ✅ 프롬프트 입력 박스
  inputContainer: {
    borderWidth: 2,
    borderColor: '#51BCB4',
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.25,
    marginTop: height * 0.1,
    paddingHorizontal: scaleSize(12),
  },

  input: {
    color: '#51BCB4',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    padding: scaleSize(10),
    fontSize: scaleFont(16),
    textAlignVertical: 'top',
  },

  // ✅ 버튼 컨테이너 (가로 정렬 + 양옆 여백)
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(30),
    marginBottom: scaleSize(40),
    paddingHorizontal: width * 0.05,
    width: '100%',
  },
});
