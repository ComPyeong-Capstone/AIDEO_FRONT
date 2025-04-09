import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleSize(20),
  },
  header: {
    fontWeight: 'bold',
    color: '#51BCB4',
    textAlign: 'center',
    fontSize: scaleFont(20),
    marginBottom: scaleSize(15),
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(15),
    borderRadius: scaleSize(10),
    marginBottom: scaleSize(10),
  },
  unreadBackground: {
    backgroundColor: '#ffffff', // 읽지 않은 알림 배경
  },
  readBackground: {
    backgroundColor: '#f5f5f5', // 읽은 알림 배경
  },
  notificationText: {
    color: '#273647',
    fontSize: scaleFont(16),
    flexShrink: 1,
  },
  contentContainer: {
    paddingBottom: scaleSize(30),
  },
});
