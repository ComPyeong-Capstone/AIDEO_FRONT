import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const styles = StyleSheet.create({
  // 전체 배경
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'flex-end',
  },
  flexContainer: {
    flex: 1,
  },

  // 닫기 버튼
  closeButton: {
    position: 'absolute',
    top: scaleSize(10),
    right: scaleSize(15),
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(10),
    zIndex: 20,
  },
  closeText: {
    fontSize: scaleFont(20),
    color: COLORS.textprimary,
  },

  // 헤더
  headerText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: COLORS.textprimary,
    textAlign: 'center',
    marginBottom: scaleSize(15),
  },

  // 댓글 아이템 (댓글 + 대댓글)
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  commentItem: {
    marginBottom: scaleSize(15),
    paddingHorizontal: scaleSize(12),
  },

  replyItem: {
    marginTop: scaleSize(8),
    marginLeft: scaleSize(48),
  },

  // 프로필 이미지
  profileImage: {
    width: scaleSize(36),
    height: scaleSize(36),
    borderRadius: scaleSize(18),
    marginRight: scaleSize(10),
    backgroundColor: '#ccc',
    marginTop: scaleSize(2),
  },

  // 내부 content container
  flex1: {
    flex: 1,
  },

  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  username: {
    fontSize: scaleFont(14),
    color: COLORS.textprimary,
    fontWeight: 'bold',
  },

  commentText: {
    fontSize: scaleFont(14),
    color: COLORS.textprimary,
    marginTop: scaleSize(2),
  },

  // 좋아요/삭제 버튼
  likeButton: {
    fontSize: scaleFont(16),
    paddingHorizontal: scaleSize(6),
  },

  // 답글 버튼
  replyButton: {
    color: COLORS.textSecondary,
    fontSize: scaleFont(13),
    marginTop: scaleSize(4),
  },

  // 답글 입력 알림 영역
  replyingNotice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(12),
    backgroundColor: '#2E3B4E',
    borderRadius: scaleSize(8),
    marginTop: scaleSize(8),
    marginHorizontal: scaleSize(10),
  },
  replyingText: {
    color: '#ffffff',
    fontSize: scaleFont(13),
  },
  cancelReply: {
    color: '#FF6B6B',
    fontSize: scaleFont(13),
  },

  // 그림자 배경 (Animated opacity)
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 0,
  },

  // 댓글 모달 컨테이너 (스크롤 시 애니메이션 높이 적용)
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: scaleSize(20),
    borderTopRightRadius: scaleSize(20),
    paddingHorizontal: scaleSize(12),
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(15),
    overflow: 'hidden',
  },

  // 입력창 래퍼
  inputWrapper: {
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(10),
    paddingBottom: scaleSize(5),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scaleSize(25),
    paddingHorizontal: scaleSize(14),
    paddingVertical: scaleSize(10),
    backgroundColor: '#fff',
    fontSize: scaleFont(15),
    color: '#000',
  },

  sendButton: {
    padding: scaleSize(10),
  },
  sendText: {
    fontSize: scaleFont(20),
    color: 'black',
  },

  // 공통 row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
