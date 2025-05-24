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
    paddingTop: scaleSize(1),
    paddingBottom: scaleSize(6), // 버튼 포함 시 여유 여백
  },
  row: {
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
    height: scaleSize(44), // 드롭다운 높이 줄이기
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: scaleSize(1),
    marginBottom: scaleSize(1),
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
  borderWidth: 4,
  borderRadius: 40,
  paddingHorizontal: 12,
  backgroundColor: '#f4f7fa',
},
dropdownHalf: {
  flex: 1,
  height: 44,
  paddingHorizontal: 12,
  backgroundColor: '#f4f7fa', // ✅ 일치하도록 조정
  borderRadius: 30,           // ✅ 공통 적용
  borderWidth: 1,
  borderColor: '#ccc',        // ✅ 통일감 있게
  justifyContent: 'center',
},

dropdownContainer: {
  marginTop: scaleSize(-67),
  marginLeft: scaleSize(-17),

  borderRadius: 30,           // ✅ 네 방향 모두 일치
  backgroundColor: '#fff',
  elevation: 1,
  zIndex: 999,
  overflow: 'hidden',         // ✅ 안쪽 둥글게 처리
},


placeholderStyle: {
  fontSize: 14,
  color: '#9098B1',
},

selectedTextStyle: {
  fontSize: 14,
  color: '#1e1e1e',
  marginLeft: 8,
  lineHeight: 20,         // ✅ 줄 간격 보정
},

inlineDropdownWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8, // 혹은 marginRight/marginLeft 등
  },


firstDropdownWrapper: {
  marginTop: scaleSize(4),
  marginBottom: scaleSize(16),
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
