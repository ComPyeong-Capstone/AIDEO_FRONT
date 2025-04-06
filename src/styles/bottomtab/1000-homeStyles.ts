import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ✅ 타이틀 & 업로드 아이콘 배치용
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleSize(16),
    marginBottom: scaleSize(12),
  },

  header: {
    fontWeight: 'bold',
    color: COLORS.background,
    fontSize: scaleFont(20),
  },

  headerIconButton: {
    backgroundColor: '#51BCB4',
    padding: scaleSize(8),
    borderRadius: scaleSize(8),
  },

  videoContainer: {
    backgroundColor: '#273647',
    borderRadius: scaleSize(12),
    alignItems: 'center',
    paddingBottom: scaleSize(12),
    marginBottom: scaleSize(15),
    width: '45%',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: scaleSize(8),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  title: {
    fontWeight: 'bold',
    color: '#51BCB4',
    textAlign: 'center',
    fontSize: scaleFont(16),
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(5),
  },
  profileCircle: {
    backgroundColor: '#51BCB4',
    width: scaleSize(24),
    height: scaleSize(24),
    borderRadius: scaleSize(12),
  },
  creator: {
    color: '#51BCB4',
    fontSize: scaleFont(14),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingBottom: scaleSize(20),
    paddingHorizontal: scaleSize(16),
  },
});
