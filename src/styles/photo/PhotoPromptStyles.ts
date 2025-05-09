import {StyleSheet} from 'react-native';
import {COLORS} from '../../styles/colors';
import {scaleSize, scaleFont} from '../../styles/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  progressBarWrapper: {
    position: 'absolute',
    top: scaleSize(60), // 또는 insets.top + 2
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: scaleSize(16),
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: scaleSize(40), // 스크롤 끝 여백
  },

  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scaleSize(16),
    paddingTop: scaleSize(10),
  },

  swiperContainer: {
    width: '100%',
    height: scaleSize(240),
    alignSelf: 'center',
    marginBottom: scaleSize(24),
  },

  pagination: {
    bottom: scaleSize(6),
  },

  slide: {
    width: '80%',
    aspectRatio: 9 / 16,
    borderRadius: scaleSize(12),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.imagebox,
    alignSelf: 'center',
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
    borderWidth: scaleSize(1.5),
    borderColor: COLORS.primary,
  },

  addButtonText: {
    fontSize: scaleFont(48),
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  promptInput: {
    width: '90%',
    height: scaleSize(100),
    borderColor: COLORS.primary,
    borderWidth: scaleSize(1.5),
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(12),
    paddingTop: scaleSize(12),
    fontSize: scaleFont(16),
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
    marginBottom: scaleSize(24),
  },

  // ✅ 고정된 하단 버튼 Wrapper
  fixedButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(16),
    paddingTop: scaleSize(12),
    paddingBottom: scaleSize(12),
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  buttonSpacing: {
    width: '48%',
  },
});
