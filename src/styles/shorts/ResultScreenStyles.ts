import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingTop: scaleSize(70),
  },
  resultBox: {
    width: width * 0.8,
    height: height * 0.6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(20),
    borderWidth: 2,
    borderColor: '#51BCB4',
    marginVertical: scaleSize(20),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultText: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
  buttonContainer: {
    marginTop: scaleSize(10),
    alignItems: 'center',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51BCB4',
    paddingVertical: scaleSize(15),
    paddingHorizontal: scaleSize(130),
    borderRadius: scaleSize(15),
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
    paddingVertical: scaleSize(15),
    paddingHorizontal: scaleSize(65),
    borderRadius: scaleSize(15),
    marginHorizontal: scaleSize(8),
  },
  exitButton: {
    backgroundColor: '#777',
    paddingVertical: scaleSize(15),
    paddingHorizontal: scaleSize(65),
    borderRadius: scaleSize(15),
    marginHorizontal: scaleSize(8),
  },
  smallButtonText: {
    fontSize: scaleFont(17),
    color: 'white',
  },
});
