import {StyleSheet} from 'react-native';
import {scaleSize} from '../responsive'; // ✅ 반응형 함수 가져오기
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
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
    width: '100%', // ✅ 모든 기기에서 동일한 너비 유지
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
    backgroundColor: '#0D1B2A',
    padding: scaleSize(18),
    borderRadius: scaleSize(12),
    marginBottom: scaleSize(12),
    width: '100%', // ✅ 모든 기기에서 동일한 너비 유지
  },
  videoTitle: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    color: '#51BCB4',
    textAlign: 'center', // ✅ 텍스트 중앙 정렬
  },
  videoCreator: {
    fontSize: scaleSize(14),
    color: '#A9BCD0',
    marginTop: scaleSize(6),
    textAlign: 'center',
  },
});
