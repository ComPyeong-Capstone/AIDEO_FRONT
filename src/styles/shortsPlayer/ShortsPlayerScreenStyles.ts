import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';

export const styles = StyleSheet.create({
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
  videoPlayer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 0,
  },
  videoText: {
    fontSize: scaleFont(22),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  topBar: {
    position: 'absolute',
    top: scaleSize(10),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(8),
    zIndex: 10,
  },
  editButton: {
    position: 'absolute',
    top: scaleSize(14),
    right: scaleSize(14),
    zIndex: 11,
  },
  profileTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorProfile: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    backgroundColor: '#ccc',
  },
  creatorInfoWrapper: {
    marginLeft: scaleSize(10),
  },
  creator: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: scaleFont(14),
    color: 'white',
  },
  sideMenu: {
    position: 'absolute',
    right: scaleSize(16),
    bottom: scaleSize(120),
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
    marginBottom: scaleSize(20),
  },
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
  likedUsersContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalInnerWrapper: {
    flex: 1,
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(10),
    paddingHorizontal: scaleSize(24),
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
    color: '#333',
  },
  profileCircle: {
    width: scaleSize(32),
    height: scaleSize(32),
    backgroundColor: '#D3D3D3',
    borderRadius: scaleSize(16),
  },
  cancelReply: {
    fontSize: scaleFont(15),
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginTop: scaleSize(20),
    textAlign: 'center',
  },
  commentModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  commentModalBackground: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  moreMenu: {
    position: 'absolute',
    bottom: 120, // 버튼 위 위치
    right: 20,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
  },

  moreMenuItem: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

});
