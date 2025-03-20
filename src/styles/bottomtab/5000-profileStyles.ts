import {StyleSheet} from 'react-native';
import {scaleSize} from '../responsive'; // ✅ 반응형 함수 가져오기
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기
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
    width: '90%',
    padding: scaleSize(20),
  },
   username: {

    fontWeight: 'bold',
    marginBottom: scaleSize(10),
    //alignSelf: 'flex-start', // 왼쪽 정렬
  },
  profileImage: {
    width: scaleSize(80),
    height: scaleSize(80),
    borderRadius: scaleSize(40),
    marginBottom: scaleSize(10),
    backgroundColor: '#aaa',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: scaleSize(10),
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    //color: '#51BCB4',
  },
  statLabel: {
    //color: '#51BCB4',
  },
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'flex-start', // 왼쪽 정렬
  alignItems: 'center', // 버튼들 수직 정렬
  width: '110%', // 전체 너비 사용
  marginTop: scaleSize(20),
},
button: {
  backgroundColor: '#51BCB4',
  borderRadius: scaleSize(8),
  alignItems: 'center',
  justifyContent: 'center',
  margin: scaleSize(10),
  paddingVertical: scaleSize(8),
  paddingHorizontal: scaleSize(60), // 패딩 조정
},

  buttonText: {
    color: '#1F2C3D',
    fontWeight: 'bold',
  },
  historyTitle: {

    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: scaleSize(20),
    marginTop: scaleSize(10),
  },
  historyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: scaleSize(20),
  },
  historyCard: {
    height: scaleSize(200),
    backgroundColor: COLORS.imagebox,
    borderRadius: scaleSize(20),
    width: '45%',
  },
});
