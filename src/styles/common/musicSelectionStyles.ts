import {StyleSheet} from 'react-native';
import {COLORS} from '../colors';
import {scaleFont, scaleSize} from '../responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
fixedButtonWrapper: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 16, // 👈 여기에 추가
  paddingHorizontal: 20,
      position: 'absolute',
      bottom: 0,
      width: '100%',
},

  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: scaleSize(2),
    borderColor: COLORS.primary,
    marginVertical: scaleSize(8),
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(16),
    width: '90%',
    borderRadius: scaleSize(12),
  },

  selectedMusic: {
    backgroundColor: '#3E5C76',
  },

  unselectedMusic: {
    backgroundColor: 'transparent',
  },

  musicText: {
    color: COLORS.primary,
    fontSize: scaleFont(18),
    fontWeight: 'bold',
  },

  // ✅ 버튼 영역 전체
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    bottom: scaleSize(20),
  },

  button: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(20),
  },

  prevButton: {
    backgroundColor: '#ccc',
  },

  nextButton: {
    backgroundColor: COLORS.primary,
  },

  buttonText: {
    color: COLORS.buttonText,
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});
