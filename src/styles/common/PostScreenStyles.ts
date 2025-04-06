import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../styles/colors';

const {width} = Dimensions.get('window');

const scaleSize = (size: number) => (size * width) / 375;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: scaleSize(10),
    marginVertical: scaleSize(10),
  },
  videoText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: scaleSize(18),
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    color: COLORS.primary,
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
    backgroundColor: '#ccc', // ✳️ gray 색상 원하면 COLORS.gray 추가 권장
    borderRadius: scaleSize(10),
    width: width * 0.4,
    height: scaleSize(45),
  },
  postButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.buttonBackground,
    borderRadius: scaleSize(10),
    width: width * 0.4,
    height: scaleSize(45),
  },
  buttonText: {
    fontWeight: 'bold',
    color: COLORS.buttonText,
    fontSize: scaleSize(16),
  },
  inputMultiline: {
    height: scaleSize(60),
  },
});
