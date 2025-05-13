import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

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
  },
  replyingText: {
    color: '#ffffff',
    fontSize: scaleFont(13),
  },
  cancelReply: {
    color: '#FF6B6B',
    fontSize: scaleFont(13),
  },
modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 🔹 뒤 화면이 살짝 보이도록
  },

modalContainer: {
  backgroundColor: 'white',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingHorizontal: 10,
  paddingTop: scaleSize(16),
    paddingBottom: scaleSize(15), // 키보드와 충돌하지 않게 약간 여유 두기
  height: '135%', // ⬅️ 원하는 크기만큼 조절
},

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(16), // 🔹 아래로 여백 추가
    marginBottom: scaleSize(0), // 기존 -40 제거하고 정상 처리
    paddingHorizontal: scaleSize(0),
  },
inputWrapper: {
  paddingHorizontal: scaleSize(10),
  paddingVertical: scaleSize(10),
    paddingBottom: scaleSize(5), // ✅ 하단 공간 추가
  backgroundColor: 'white',
  borderTopWidth: 1,
  borderColor: '#eee',
},

 input: {
   flex: 1,
   borderWidth: 1,
   borderColor: '#ccc',
   borderRadius: 25,
   paddingHorizontal: 14,
   paddingVertical: 12,
   backgroundColor: '#fff',
   fontSize: 16,
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
