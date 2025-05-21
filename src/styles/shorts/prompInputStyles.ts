import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // 진행바 위치 설정
  progressBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: scaleSize(12),
    paddingBottom: scaleSize(8),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    zIndex: 10,
  },

  // 입력 영역 전체
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleSize(70), // 상단 진행바 공간 확보
  },

  inputContainer: {
    borderWidth: scaleSize(2),
    borderColor: COLORS.primary,
    borderRadius: scaleSize(12),
    width: '100%',
    height: scaleSize(160),
    paddingHorizontal: scaleSize(12),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  input: {
    width: '100%',
    height: '100%',
    color: COLORS.primary,
    fontSize: scaleFont(16),
    textAlignVertical: 'top',
    padding: scaleSize(10),
  },

  // 하단 버튼 영역
  fixedButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(14),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 10,
  },

  buttonSpacing: {
    width: '48%',
  },

  // 로딩 오버레이
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  // 로딩 박스
  loadingBox: {
    backgroundColor: '#333',
    padding: scaleSize(20),
    borderRadius: scaleSize(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleSize(10),
  },

  loadingText: {
    marginTop: scaleSize(5),
    color: '#fff',
    fontSize: scaleFont(14),
  },

  // 완료 모달 오버레이
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleSize(20),
  },

  // 모달 박스
  modalBox: {
    width: '90%',
    backgroundColor: '#fff',
    padding: scaleSize(20),
    borderRadius: scaleSize(12),
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
    color: COLORS.primary,
  },

  modalMessage: {
    fontSize: scaleFont(14),
    color: '#444',
    textAlign: 'center',
    marginBottom: scaleSize(20),
  },
});
