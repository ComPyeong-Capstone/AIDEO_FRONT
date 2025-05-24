// styles/common/subtitlesSettingStyles.ts

import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIDEO_RATIO_HEIGHT = SCREEN_WIDTH * (16 / 9); // 9:16 세로 비율 (반대로 계산)

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
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(40), // 버튼 포함 시 여유 여백
  },
  row: {
    marginBottom: scaleSize(16),
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
    borderRadius: scaleSize(8),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    height: scaleSize(44), // 드롭다운 높이 줄이기
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: scaleSize(30),
    marginBottom: scaleSize(20),
  },
  previewContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  previewBox: {
width: SCREEN_WIDTH,
  height: SCREEN_WIDTH * (16 / 9), // 세로 비율
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  previewText: {
    position: 'absolute',
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
dropdown: {
  height: 50,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 40,
  paddingHorizontal: 12,
  backgroundColor: '#f4f7fa',
},
dropdownContainer: {
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  borderWidth: 1,
  borderColor: '#d6dee6',
  backgroundColor: '#fff',
  overflow: 'hidden', // ✅ 핵심: 안쪽 내용도 둥글게
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
},

dropdownHalf: {
    flex: 1,
    height: 46,
    backgroundColor: '#EEEEEE',
    borderRadius: 30,
    paddingHorizontal: 8,
  },
placeholderStyle: {
  fontSize: 14,
  color: '#9098B1',
},

selectedTextStyle: {
  fontSize: 14,
  color: '#1e1e1e',
},inlineDropdownWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8, // 혹은 marginRight/marginLeft 등
  },



  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: '#999',
  },smallLabel: {
      fontSize: 13,
      marginBottom: 4,
      color: '#333',
      fontWeight: '500',
    },


  iconStyle: {
    width: 20,
    height: 20,
  },


});
