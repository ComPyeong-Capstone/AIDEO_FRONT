import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';

export const styles = StyleSheet.create({
  // 전체 배경
  safeContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  flexContainer: {
    flex: 1,
  },

  // 모달 박스
  modalContainer: {
    flex: 1,
    backgroundColor: '#1E2A38',
    paddingTop: scaleSize(50),
    paddingHorizontal: scaleSize(20),
    borderTopLeftRadius: scaleSize(15),
    borderTopRightRadius: scaleSize(15),
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
    color: 'white',
  },

  // 헤더
  headerText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#51BCB4',
    textAlign: 'center',
    marginBottom: scaleSize(15),
  },

  // 공통: 댓글 아이템 (댓글 + 대댓글)
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // 댓글
  commentItem: {
    marginBottom: scaleSize(15),
  },

  // 대댓글
  replyItem: {
    marginTop: scaleSize(8),
    marginLeft: scaleSize(40),
  },

  profileCircle: {
    width: scaleSize(30),
    height: scaleSize(30),
    backgroundColor: '#D3D3D3',
    borderRadius: scaleSize(15),
    marginRight: scaleSize(10),
    marginTop: scaleSize(4),
  },
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
    color: 'white',
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: scaleFont(14),
    color: 'white',
    marginTop: scaleSize(2),
  },

  // 좋아요/삭제 버튼
  likeButton: {
    fontSize: scaleFont(16),
    paddingHorizontal: scaleSize(6),
  },

  // 답글 버튼
  replyButton: {
    color: '#51BCB4',
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
  },
  replyingText: {
    color: '#ffffff',
    fontSize: scaleFont(13),
  },
  cancelReply: {
    color: '#FF6B6B',
    fontSize: scaleFont(13),
  },

  // 입력창
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(10),
    padding: scaleSize(10),
    marginTop: scaleSize(15),
  },
  input: {
    flex: 1,
    fontSize: scaleFont(16),
    color: 'black',
    paddingHorizontal: scaleSize(10),
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
