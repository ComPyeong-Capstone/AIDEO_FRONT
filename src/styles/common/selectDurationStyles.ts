import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors'; // 🎯 공통 색상 정의

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  // 📌 전체 화면 배경 및 패딩
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // 📌 진행바 위치 (노치 아래 최상단에 고정)
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

  // 📌 콘텐츠는 가운데 정렬, 좌우 패딩
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: width * 0.05,
  },

  // 📌 제목 텍스트
  title: {
    fontSize: scaleFont(20),
    marginTop: height * 0.04,
    marginBottom: height * 0.03,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  // 📌 슬라이더 영역
  sliderWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },

  slider: {
    width: '100%',
    height: scaleSize(40),
  },

  sliderValueText: {
    fontSize: scaleFont(18),
    marginBottom: scaleSize(10),
    color: '#333',
  },

  // 📌 버튼 그룹: 가로 정렬 + 여백
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.04,
    width: '100%',
  },

  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: scaleSize(14),
    width: '48%',
    borderRadius: scaleSize(10),
    alignItems: 'center',
  },

  nextButton: {
    backgroundColor: '#51BCB4',
    paddingVertical: scaleSize(14),
    width: '48%',
    borderRadius: scaleSize(10),
    alignItems: 'center',
  },

  nextButtonText: {
    fontSize: scaleFont(16),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
