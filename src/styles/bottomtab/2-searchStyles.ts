import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.maincolor,
    borderRadius: scaleSize(12),
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(10),
    marginHorizontal: scaleSize(15),
    marginBottom: scaleSize(15),
  },

  searchIcon: {
    marginRight: scaleSize(8),
  },

  searchInput: {
    flex: 1,
    color: COLORS.black,
    fontSize: scaleFont(16),
  },

  videoItem: {
    width: '48%',
    backgroundColor: COLORS.videocontainer,
    borderRadius: scaleSize(25),
    alignItems: 'center',
    paddingBottom: scaleSize(10),
    marginBottom: scaleSize(15),
  },

  videoThumbnail: {
    width: '100%',
    aspectRatio: 9 / 10, // 세로형 영상 비율
    backgroundColor: COLORS.thumbnail,
    borderTopLeftRadius: scaleSize(12),
    borderTopRightRadius: scaleSize(12),
  },

  videoInfoContainer: {
    alignItems: 'center',
    marginTop: scaleSize(10),
  },

  videoTitle: {
    fontWeight: 'bold',
    color: COLORS.maincolor,
    textAlign: 'center',
    fontSize: scaleFont(16),
  },

  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(5),
  },

  profileImage: {
    width: scaleSize(24),
    height: scaleSize(24),
    borderRadius: scaleSize(12),
    backgroundColor: COLORS.maincolor,
    marginRight: scaleSize(8),
  },

  videoCreator: {
    color: COLORS.maincolor,
    fontSize: scaleFont(14),
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: scaleSize(15),
  },

  contentContainer: {
    paddingBottom: scaleSize(10),
  },
});
