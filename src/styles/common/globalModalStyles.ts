// ✅ globalModalStyles.ts
import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleSize(20),
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: scaleSize(12),
    padding: scaleSize(20),
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
    color: '#000',
  },
  message: {
    fontSize: scaleFont(14),
    marginBottom: scaleSize(20),
    textAlign: 'center',
    color: '#333',
  },
});
