import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../styles/colors';
import {scaleSize, scaleFont} from '../../styles/responsive';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  progressBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingTop: scaleSize(10),
    paddingHorizontal: width * 0.05,
    backgroundColor: COLORS.background,
    zIndex: 10,
  },

  // ✅ ScrollView 내부 콘텐츠
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: height * 0.26, // 하단 버튼과 입력창 여유
  },

  // ✅ 전체 본문 Wrapper
  contentWrapper: {
    width: '90%',
    alignItems: 'center',
    paddingHorizontal: scaleSize(16),
    paddingTop: height * 0.07, // 진행바 아래 간격
  },

  // ✅ Swiper 컨테이너 (9:16 비율 고정)
  swiperContainer: {
    width: '90%',
    aspectRatio: 9 / 16,
    alignSelf: 'center',
  },

  // ✅ Swiper 내부 슬라이드
  slide: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: scaleSize(12),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.imagebox,
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

  // ✅ Swiper pagination dot 위치를 Swiper 박스 외부로 내리기 위한 스타일
  pagination: {
    position: 'absolute',
    bottom: -scaleSize(25),
  },

  // ✅ dot과 프롬프트 입력창 사이 여백
  paginationSpacing: {
    height: scaleSize(32),
  },

  // ✅ 프롬프트 입력창 wrapper
  inputContainer: {
    width: '90%',
    borderRadius: scaleSize(8),
    borderWidth: scaleSize(1.5),
    borderColor: COLORS.primary,
    backgroundColor: '#fff',
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(8),
    marginBottom: scaleSize(12),
  },

  // ✅ 프롬프트 입력창 내부
  promptInput: {
    width: '100%',
    height: height * 0.08,
    fontSize: scaleFont(16),
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
  },

  // ✅ 하단 버튼 고정 영역
  fixedButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(14),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 10,
  },

  // ✅ 하단 버튼 간격
  buttonSpacing: {
    width: '48%',
  },
});
