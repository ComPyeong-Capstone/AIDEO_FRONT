import {StyleSheet} from 'react-native';
import {scaleFont, scaleSize} from '../responsive';
import {COLORS} from '../colors';

export const googleSignupStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleSize(20),
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: scaleSize(24),
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scaleSize(8),
    padding: scaleSize(14),
    fontSize: scaleFont(16),
    marginBottom: scaleSize(20),
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#51BCB4',
    paddingVertical: scaleSize(14),
    paddingHorizontal: scaleSize(40),
    borderRadius: scaleSize(8),
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});
