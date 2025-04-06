import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../../styles/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  profileSection: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: scaleSize(10),
    width: width * 0.9,
    padding: scaleSize(20),
  },

  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: scaleSize(10),
  },

  profileImage: {
    width: scaleSize(80),
    height: scaleSize(80),
    borderRadius: scaleSize(40),
    backgroundColor: '#aaa',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginLeft: scaleSize(20),
  },

  statItem: {
    alignItems: 'center',
  },

  statNumber: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    textAlign: 'center',
  },

  statLabel: {
    fontSize: scaleFont(12),
    color: '#444',
  },

  username: {
    marginTop: scaleSize(10),
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    color: '#000',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: scaleSize(20),
  },

  button: {
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(8),
    alignItems: 'center',
    justifyContent: 'center',
    margin: scaleSize(8),
    paddingVertical: scaleSize(8),
    paddingHorizontal: width * 0.1,
  },

  fullWidthButton: {
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(20),
    paddingVertical: scaleSize(12),
    width: width * 0.9,
  },

  buttonText: {
    color: '#1F2C3D',
    fontWeight: 'bold',
    fontSize: scaleFont(14),
  },

  historyHeader: {
    width: width * 0.85,
    marginTop: scaleSize(20),
    marginBottom: scaleSize(10),
  },

  historyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  historyTitle: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
  },

  historyTitleLarge: {
    fontSize: scaleFont(16),
  },

  postCountText: {
    marginLeft: scaleSize(6),
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#888',
  },

  historyContainer: {
    width: width * 0.9,
    flexGrow: 1,
  },

  historyCard: {
    width: width * 0.42,
    margin: scaleSize(6),
    borderRadius: scaleSize(10),
    backgroundColor: COLORS.imagebox,
    overflow: 'hidden',
  },

  historyThumbnail: {
    width: '100%',
    height: scaleSize(120),
    backgroundColor: '#ddd',
  },

  historyCardTitle: {
    padding: scaleSize(8),
    fontSize: scaleFont(12),
    textAlign: 'center',
    fontWeight: '500',
  },

  centered: {
    alignItems: 'center',
  },

  // 🔷 Modal 관련
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: scaleSize(10),
    padding: scaleSize(20),
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
  },

  modalImage: {
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: scaleSize(30),
    margin: scaleSize(6),
  },

  modalSaveButton: {
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(8),
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(40),
    marginTop: scaleSize(20),
  },

  modalCloseText: {
    color: '#888',
    marginTop: scaleSize(10),
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(8),
    marginBottom: scaleSize(10),
    fontSize: scaleFont(14),
  },

  // 🔥 로그아웃 버튼
  logoutButton: {
    position: 'absolute',
    bottom: scaleSize(30),
    right: scaleSize(20),
    backgroundColor: '#FF4D4D',
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(20),
    borderRadius: scaleSize(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scaleFont(14),
  },
});
