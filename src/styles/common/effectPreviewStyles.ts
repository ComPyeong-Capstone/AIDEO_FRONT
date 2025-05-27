import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../colors';
import {scaleFont, scaleSize} from '../responsive';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// ✅ 반응형 영상 크기: 너비 기준 70%, 9:16 비율 유지
const videoWidth = SCREEN_WIDTH * 0.7;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scaleSize(16),
  },

  title: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: scaleSize(20),
    marginBottom: scaleSize(12),
    textAlign: 'center',
  },

  videoContainer: {
    width: videoWidth,
    aspectRatio: 9 / 16,
    borderRadius: scaleSize(12),
    overflow: 'hidden',
    backgroundColor: '#000',
    alignSelf: 'center',
    marginBottom: scaleSize(24),
  },

  video: {
    width: '100%',
    height: '100%',
  },

  label: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    marginBottom: scaleSize(16),
    color: COLORS.text,
    textAlign: 'center',
  },

  // ✅ 버튼을 반씩 나란히 정렬할 컨테이너
  effectList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleSize(12),
    paddingHorizontal: scaleSize(8),
    marginBottom: scaleSize(36),
  },

  // ✅ 반씩 차지하는 버튼 스타일
  effectButton: {
    flex: 1,
    paddingVertical: scaleSize(10),
    backgroundColor: '#f0f0f0',
    borderRadius: scaleSize(8),
    alignItems: 'center',
  },

  selectedEffectButton: {
    backgroundColor: COLORS.primary,
  },

  effectText: {
    fontSize: scaleFont(15),
    color: '#333',
  },

  selectedEffectText: {
    color: '#fff',
    fontWeight: '600',
  },

  scrollBottom: {
    paddingBottom: scaleSize(60),
    alignItems: 'center',
    paddingHorizontal: scaleSize(16),
    width: '100%',
  },

  // ✅ 최종 영상 생성 버튼 (더 아래로)
  fullButton: {
    width: '100%',
    height: scaleSize(50),
    marginTop: scaleSize(28),
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  loadingText: {
    color: '#fff',
    marginTop: scaleSize(12),
    fontSize: scaleFont(16),
  },
});

export default styles;
