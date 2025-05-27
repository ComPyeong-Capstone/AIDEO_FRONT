import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  // 전체 배경
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // 진행바
  progressBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingTop: scaleSize(5),
    paddingHorizontal: width * 0.05,
    backgroundColor: COLORS.background,
    zIndex: 10,
  },

  // 콘텐츠
contentWrapper: {
  flex: 1,
  justifyContent: 'flex-start', // 위쪽 정렬
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: width * 0.05,
  paddingTop: height * 0.2, // 여백이 필요하다면 추가
},


  // 제목
  title: {
    fontSize: scaleFont(24),
    marginTop: height * 0.04,
    marginBottom: height * 0.03,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  // 슬라이더
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

  // ✅ 하단 고정 버튼 래퍼
  fixedButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(20),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: COLORS.background,
    position: 'absolute',
    bottom: 0,
    width: '100%',

  },



});
