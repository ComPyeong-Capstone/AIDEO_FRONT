import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../styles/colors';
import {scaleSize, scaleFont} from '../../styles/responsive';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: scaleSize(220),
  },

  contentWrapper: {
    width: '80%',
    alignItems: 'center',
    paddingTop: scaleSize(20),
  },

  swiperContainer: {
    width: '100%',
    aspectRatio: 9 / 16,
    maxHeight: height * 0.6,
  },

  slide: {
    width: '100%',
    aspectRatio: 9 / 16,
    maxHeight: height * 0.6,
    borderRadius: scaleSize(12),
    backgroundColor: COLORS.imagebox,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  addButton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scaleSize(2),
    borderColor: COLORS.primary,
  },

  addButtonText: {
    fontSize: scaleFont(48),
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  pagination: {
    position: 'absolute',
    bottom: -scaleSize(24),
  },

  paginationSpacing: {
    height: scaleSize(32),
  },

  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: COLORS.primary,
    borderWidth: scaleSize(1.5),
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(8),
    marginBottom: scaleSize(16),
  },

  promptInput: {
    width: '100%',
    height: scaleSize(70),
    fontSize: scaleFont(16),
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
  },

  fixedButtonWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(14),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 10,
  },

  buttonSpacing: {
    width: '48%',
  },

  toast: {
    position: 'absolute',
    top: scaleSize(90),
    left: scaleSize(20),
    right: scaleSize(20),
    backgroundColor: '#333',
    padding: scaleSize(12),
    borderRadius: scaleSize(8),
    zIndex: 999,
    elevation: 5,
  },

  toastText: {
    color: '#fff',
    fontSize: scaleFont(14),
    textAlign: 'center',
  },

  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingBox: {
    backgroundColor: '#222',
    padding: scaleSize(20),
    borderRadius: scaleSize(10),
    alignItems: 'center',
    width: '70%',
  },

  loadingText: {
    color: '#fff',
    fontSize: scaleFont(16),
    marginVertical: scaleSize(12),
    textAlign: 'center',
  },
});
