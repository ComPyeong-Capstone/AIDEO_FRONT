import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleSize(1),
    paddingBottom: scaleSize(6), // 버튼 포함 시 여유 여백
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleSize(8),
    marginBottom: scaleSize(26),
  },
  label: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    marginBottom: scaleSize(6),
    color: COLORS.black,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: scaleSize(9),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    height: scaleSize(44),
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: scaleSize(10),
    marginBottom: scaleSize(20),
    alignItems: 'center',
  },
  previewContainer: {
    alignItems: 'center',
    marginVertical: scaleSize(16),
  },
  previewBox: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * (16 / 9),
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  previewText: {
    position: 'absolute',
    left: scaleSize(20),
    fontSize: scaleFont(20),
    fontWeight: 'bold',
  },

  // ✅ Dropdown 스타일
  dropdown: {
    height: scaleSize(50),
    borderColor: '#ccc',
    borderWidth: 4,
    borderRadius: scaleSize(40),
    paddingHorizontal: scaleSize(12),
    backgroundColor: '#f4f7fa',
  },
  dropdownHalf: {
    flex: 1,
    height: scaleSize(44),
    paddingHorizontal: scaleSize(12),
    backgroundColor: '#f4f7fa',
    borderRadius: scaleSize(30),
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  dropdownContainer: {
    marginTop: scaleSize(-67),
    marginLeft: scaleSize(-17),
    borderRadius: scaleSize(30),
    backgroundColor: '#fff',
    elevation: 1,
    zIndex: 999,
    overflow: 'hidden',
  },
  placeholderStyle: {
    fontSize: scaleFont(14),
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: scaleFont(14),
    color: '#1e1e1e',
    marginLeft: scaleSize(8),
    lineHeight: scaleFont(20),
  },

  // ✅ 가로 드롭다운 두 개 (폰트 + 자막 위치)
  inlineDropdownWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleSize(8),
    marginBottom: scaleSize(20),
  },
  halfWidthDropdownWrapper: {
    flex: 1,
  },

  // ✅ 기타 라벨
  firstDropdownWrapper: {
    marginTop: scaleSize(4),
    marginBottom: scaleSize(16),
  },
  smallLabel: {
    fontSize: scaleFont(13),
    marginBottom: scaleSize(4),
    color: '#333',
    fontWeight: '500',
  },
  iconStyle: {
    width: scaleSize(20),
    height: scaleSize(20),
  },

  // ✅ 로딩 오버레이
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingBox: {
    backgroundColor: '#333',
    padding: scaleSize(20),
    borderRadius: scaleSize(12),
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: scaleSize(10),
    fontSize: scaleFont(16),
  },
});
