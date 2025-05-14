import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../styles/colors';

const {width} = Dimensions.get('window');

const scaleSize = (size: number) => (size * width) / 375;
const videoWidth = width * 0.8;
const videoHeight = videoWidth * (16 / 9);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '10%',
  },

   videoContainer: {
      width: videoWidth,
      height: videoHeight,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: COLORS.black,
      borderWidth: 2,
      borderRadius: scaleSize(10),
      marginVertical: scaleSize(10),
    },

  videoText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: scaleSize(18),
  },
input: {
  borderColor: COLORS.black,
  borderWidth: 1,
  borderRadius: scaleSize(8), // ⬅️ 둥근 정도 줄임
  paddingHorizontal: scaleSize(10),
  color: COLORS.black,
  marginBottom: scaleSize(1), // ⬅️ 아래 요소와 간격 줄임
  height: scaleSize(40),
},


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleSize(10),
  },

  buttonText: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: scaleSize(16),
  },
  inputMultiline: {
    height: scaleSize(80),
  },
});
