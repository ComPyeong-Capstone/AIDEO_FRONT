import {StyleSheet} from 'react-native';
import {scaleSize} from '../responsive';
import {COLORS} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(10),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(12),
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(10),
    marginBottom: scaleSize(18),
    width: '100%',
  },
  searchIcon: {
    marginRight: scaleSize(8),
  },
  searchInput: {
    flex: 1,
    color: '#1F2C3D',
    fontSize: scaleSize(16),
  },
  videoItem: {
    backgroundColor: COLORS.imagebox,
    borderRadius: scaleSize(12),
    marginBottom: scaleSize(12),
    overflow: 'hidden',
    paddingBottom: scaleSize(8), // ✅ 하단 여백 추가
  },
  videoThumbnail: {
    width: '100%',
    height: scaleSize(150),
    backgroundColor: '#ccc',
  },
  videoInfoContainer: {
    paddingHorizontal: scaleSize(10),
    paddingTop: scaleSize(10),
    alignItems: 'flex-start', // ✅ 왼쪽 정렬
  },
  videoTitle: {
    fontSize: scaleSize(16),
    fontWeight: 'bold',
    color: '#51BCB4',
  },
  videoCreator: {
    fontSize: scaleSize(14),
    color: '#A9BCD0',
    marginTop: scaleSize(4),
  },
});
