import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

const {width, height} = Dimensions.get('window');

const VIDEO_WIDTH = width * 0.85;
const VIDEO_HEIGHT = height * 0.65;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingTop: scaleSize(90),
  },

  // ✅ 영상 박스 (최종 미리보기)
  videoBox: {

        marginTop: 10, // 👈 여기에 추가

    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(20),
    borderWidth: 2,
    borderColor: '#ccc',
    marginVertical: scaleSize(25),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // ✅ 실제 Video 태그에 적용
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
fixedButtonWrapper: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 12, // 👈 여기에 추가
  paddingHorizontal: 20,
},
  // ✅ 영상이 없을 때 메시지
  errorText: {
    fontSize: scaleFont(14),
    color: '#888',
    textAlign: 'center',
  },

  buttonContainer: {
    marginTop: scaleSize(10),
    alignItems: 'center',
      width: '95%', // ✅ 전체 너비로 확장
  marginTop: -10, // 👈 여기에 추가

  },

  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51BCB4',
    paddingVertical: scaleSize(15),
    paddingHorizontal: scaleSize(145),
    borderRadius: scaleSize(20),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  buttonText: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: scaleSize(10),
  },

  smallButtonContainer: {
    flexDirection: 'row',
    marginTop: scaleSize(16),
  },

  saveButton: {
    backgroundColor: '#356868',
    paddingVertical: scaleSize(16),
    paddingHorizontal: scaleSize(65),
    borderRadius: scaleSize(20),
    marginHorizontal: scaleSize(8),
  },

  exitButton: {
    backgroundColor: '#777',
    paddingVertical: scaleSize(16),
    paddingHorizontal: scaleSize(65),
    borderRadius: scaleSize(20),
    marginHorizontal: scaleSize(8),
  },

  smallButtonText: {
    fontSize: scaleFont(17),
    color: 'white',
  },

  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(6), // React Native >= 0.71 이상 지원
  },
});
