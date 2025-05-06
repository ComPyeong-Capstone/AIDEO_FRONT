import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';
import {COLORS} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

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
    padding: scaleSize(10),
    borderRadius: scaleSize(8),
  },

  videoContainer: {
    backgroundColor: '#273647',
    borderRadius: scaleSize(25),
    alignItems: 'center',
    paddingBottom: scaleSize(10),
    marginBottom: scaleSize(15),
  },

  thumbnailPlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#4F637D',
    borderTopLeftRadius: scaleSize(12),
    borderTopRightRadius: scaleSize(12),
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

  profileImage: {
    width: scaleSize(24),
    height: scaleSize(24),
    borderRadius: scaleSize(12),
    backgroundColor: '#51BCB4',
    marginRight: scaleSize(8),
  },

  creator: {
    color: '#51BCB4',
    fontSize: scaleFont(14),
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  contentContainer: {
    //paddingBottom: scaleSize(0),
    paddingHorizontal: scaleSize(15),
  },
});
