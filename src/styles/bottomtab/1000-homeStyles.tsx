import {StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../responsive'; // ✅ 반응형 함수 가져오기
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // ✅ 전역 변수 사용
  },
  header: {
    fontWeight: 'bold',
    color: '#51BCB4',
    textAlign: 'center',
    fontSize: scaleFont(20),
  },
  videoContainer: {
    backgroundColor: '#273647',
    borderRadius: scaleSize(12), // ✅ width 제거
    alignItems: 'center',
    paddingBottom: scaleSize(12),
    marginBottom: scaleSize(15),
    width: '45%', // ✅ 기기에 따라 동일한 비율 적용
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9, // ✅ 모든 기기에서 같은 비율 유지 (16:9)
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
    fontSize: scaleFont(16), // ✅ width 제거
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(5),
  },
  profileCircle: {
    backgroundColor: '#51BCB4',
    width: scaleSize(24), // ✅ width 제거
    height: scaleSize(24),
    borderRadius: scaleSize(12),
  },
  creator: {
    color: '#51BCB4',
    fontSize: scaleFont(14), // ✅ width 제거
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingBottom: scaleSize(20), // ✅ width 제거
  },
});
