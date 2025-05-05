import {StyleSheet, Dimensions} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scaleFont(20),
    marginBottom: height * 0.03,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  sliderWrapper: {
    width: '90%',
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

  // ✅ 버튼 그룹을 가로로 배치
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.04,
    width: '100%',
  },

  // ✅ 두 버튼 모두 같은 너비로 통일
  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: scaleSize(14),
    width: '45%',
    borderRadius: scaleSize(10),
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#51BCB4',
    paddingVertical: scaleSize(14),
    width: '45%',
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
