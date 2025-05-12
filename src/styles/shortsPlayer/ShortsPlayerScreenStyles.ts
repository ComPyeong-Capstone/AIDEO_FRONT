import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';

export const styles = StyleSheet.create({
  // 📌 전체 화면 배경
  videoPlayer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },

  safeContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    fontSize: scaleFont(22),
    fontWeight: 'bold',
    color: 'white',
  },

  // 📌 좋아요 & 댓글 메뉴
  sideMenu: {
    position: 'absolute',
    right: scaleSize(20),
    bottom: scaleSize(100),
    alignItems: 'center',
  },
  icon: {
    fontSize: scaleFont(28),
    marginBottom: scaleSize(12),
    color: 'white',
  },
  count: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scaleSize(18),
  },

  // 📌 영상 정보
  videoInfo: {
    position: 'absolute',
    bottom: scaleSize(40),
    left: scaleSize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorProfile: {
    width: scaleSize(30),
    height: scaleSize(30),
    backgroundColor: '#D3D3D3',
    borderRadius: scaleSize(15),
    marginRight: scaleSize(10),
  },
  creator: {
    fontSize: scaleFont(14),
    color: 'white',
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: 'white',
  },

  // 📌 뒤로 가기 버튼
  backButton: {
    position: 'absolute',
    top: scaleSize(50),
    left: scaleSize(20),
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: scaleSize(14),
    borderRadius: scaleSize(50),
  },
  backText: {
    color: 'white',
    fontSize: scaleFont(22),
    fontWeight: 'bold',
  },

  // ✅ 좋아요 유저 보기 버튼 (내 게시물일 경우)
  likeUserButton: {
    position: 'absolute',
    bottom: scaleSize(160),
    left: scaleSize(20),
    backgroundColor: 'white',
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(14),
    borderRadius: scaleSize(10),
  },
  likeUserButtonText: {
    fontSize: scaleFont(13),
    fontWeight: 'bold',
    color: '#333',
  },

  // ✅ 좋아요 유저 목록 모달
  likedUsersContainer: {
    flex: 1,
    padding: scaleSize(20),
    backgroundColor: 'white',
  },
  likedUsersTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
  },
  likedUserItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleSize(8),
  },
  likedUserText: {
    fontSize: scaleFont(16),
    marginLeft: scaleSize(10),
  },
  profileCircle: {
    width: scaleSize(30),
    height: scaleSize(30),
    backgroundColor: '#D3D3D3',
    borderRadius: scaleSize(15),
  },
  cancelReply: {
    fontSize: scaleFont(15),
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginTop: scaleSize(20),
    textAlign: 'center',
  },
});
