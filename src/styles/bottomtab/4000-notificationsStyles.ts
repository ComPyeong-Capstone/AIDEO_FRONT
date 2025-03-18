import {StyleSheet} from 'react-native';
import {scaleSize} from '../responsive'; // ✅ 반응형 함수 가져오기
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // ✅ 배경색
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleSize(20),
  },
  header: {
    fontWeight: 'bold',
    color: '#51BCB4',
    textAlign: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#273647', // ✅ 카드 배경색
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(15),
    borderRadius: scaleSize(10),
    marginBottom: scaleSize(10), // ✅ 리스트 간격 추가
  },
  notificationText: {
    color: '#51BCB4',
  },
});
