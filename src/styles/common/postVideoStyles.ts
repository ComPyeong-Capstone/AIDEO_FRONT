import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../colors';

const {width} = Dimensions.get('window');

const scaleSize = (size: number) => (size * width) / 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  fixedButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10, // 👈 여기에 추가
    paddingHorizontal: 20,
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.black,
    borderWidth: 2,
    borderRadius: scaleSize(10),
    marginVertical: scaleSize(10),
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  uploadIcon: {
    marginBottom: scaleSize(20),
  },
  videoText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: scaleSize(18),
  },
  input: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    color: COLORS.black,
    marginBottom: scaleSize(10),
    height: scaleSize(40),
  },
  inputMultiline: {
    height: scaleSize(50),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleSize(10),
  },
  uploadProgressWrapper: {
    marginTop: scaleSize(10),
    alignItems: 'center',
  },
  uploadProgressText: {
    marginTop: scaleSize(5),
    color: '#51BCB4',
  },
  halfWidthButton: {
    width: '45%',
  },
});

// ✅ 함수형 스타일
export const dynamicVideoSize = (screenWidth: number) => ({
  width: screenWidth * 0.8,
  height: screenWidth * 0.8 * (16 / 9),
});

export const inputFullWidth = (screenWidth: number) => ({
  width: screenWidth * 0.9,
});

export default styles;
