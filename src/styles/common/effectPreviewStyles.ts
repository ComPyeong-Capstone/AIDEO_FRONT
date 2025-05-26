import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../colors';
import {scaleFont, scaleSize} from '../responsive';

const {width} = Dimensions.get('window');

// ✅ 영상 미리보기 크기: 너비의 70%, 16:9 비율 유지
const videoWidth = width * 0.7;
const videoHeight = videoWidth * (9 / 16);

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
    marginVertical: scaleSize(16),
    textAlign: 'center',
  },
  videoWrapper: {
    width: videoWidth,
    height: videoHeight,
    borderRadius: scaleSize(12),
    overflow: 'hidden',
    backgroundColor: '#000',
    alignSelf: 'center',
    marginBottom: scaleSize(20),
  },
  video: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    marginBottom: scaleSize(8),
    color: COLORS.text,
    textAlign: 'center',
  },
  effectList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: scaleSize(10),
    marginBottom: scaleSize(20),
  },
  effectButton: {
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(16),
    backgroundColor: '#f0f0f0',
    borderRadius: scaleSize(8),
    marginBottom: scaleSize(10),
  },
  selectedEffectButton: {
    backgroundColor: COLORS.primary,
  },
  effectText: {
    fontSize: scaleFont(14),
    color: '#333',
  },
  selectedEffectText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollBottom: {
    paddingBottom: scaleSize(40),
    alignItems: 'center',
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
