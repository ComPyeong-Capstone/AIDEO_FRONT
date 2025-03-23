import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // ✅ 배경 투명도 추가
    justifyContent: 'flex-end',
  },
  flexContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1, // ✅ 전체 height 고정 대신 SafeArea 안쪽에서 채움
    backgroundColor: '#1E2A38',
    paddingTop: scaleSize(50),
    paddingHorizontal: scaleSize(20),
    borderTopLeftRadius: scaleSize(15),
    borderTopRightRadius: scaleSize(15),
  },
  closeButton: {
    position: 'absolute',
    top: scaleSize(10),
    right: scaleSize(15),
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(10),
    zIndex: 20, // ✅ 버튼이 위로 올라오게
  },
  closeText: {
    fontSize: scaleFont(20),
    color: 'white',
  },

  headerText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#51BCB4',
    textAlign: 'center',
    marginBottom: scaleSize(15),
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(15),
  },
  profileCircle: {
    width: scaleSize(30),
    height: scaleSize(30),
    backgroundColor: '#D3D3D3',
    borderRadius: scaleSize(15),
    marginRight: scaleSize(10),
  },
  username: {
    fontSize: scaleFont(14),
    color: 'white',
  },
  commentText: {
    fontSize: scaleFont(14),
    color: 'white',
  },
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
  },
});
