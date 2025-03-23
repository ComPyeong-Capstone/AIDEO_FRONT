import {StyleSheet, Dimensions} from 'react-native';
import {scaleSize, scaleFont} from '../responsive';

const {width, height} = Dimensions.get('window'); // 📌 전체 화면 크기 가져오기

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'black', // ✅ SafeAreaView용 스타일 추가
  },
  container: {
    flex: 1,
    backgroundColor: 'black', // 📌 배경을 검은색으로 설정하여 대비 향상
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    flex: 1, // ✅ 화면 전체를 차지하도록 설정
    width: '100%', // ✅ 가로 전체 채우기
    height: '100%', // ✅ 세로 전체 채우기
    backgroundColor: 'black', // 📌 실제 영상 대신 검은 배경
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    fontSize: scaleFont(22),
    fontWeight: 'bold',
    color: 'white', // ✅ 텍스트 색상 흰색으로 변경
  },
  /* 📌 좋아요 및 댓글 UI (오른쪽 하단 고정) */
  sideMenu: {
    position: 'absolute',
    right: scaleSize(20), // ✅ 화면 오른쪽 정렬
    bottom: scaleSize(100), // ✅ 화면 하단 기준으로 위치 조정
    alignItems: 'center',
  },
  icon: {
    fontSize: scaleFont(28), // ✅ 아이콘 크기 증가
    marginBottom: scaleSize(12),
    color: 'white', // ✅ 아이콘 색상 흰색
  },
  count: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    color: 'white', // ✅ 숫자 색상 흰색
    marginBottom: scaleSize(18),
  },
  /* 📌 영상 정보 (좌측 하단 고정) */
  videoInfo: {
    position: 'absolute',
    bottom: scaleSize(40), // ✅ 하단 위치 조정
    left: scaleSize(20),
    flexDirection: 'row', // ✅ 제작자와 제목 가로 정렬
    alignItems: 'center',
  },
  creatorProfile: {
    width: scaleSize(30), // ✅ 프로필 크기 증가
    height: scaleSize(30),
    backgroundColor: '#D3D3D3',
    borderRadius: scaleSize(15),
    marginRight: scaleSize(10), // ✅ 오른쪽 여백 추가
  },
  creator: {
    fontSize: scaleFont(14),
    color: 'white', // ✅ 제작자 정보 색상을 흰색으로 변경
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: 'white', // ✅ 제목 색상을 흰색으로 변경
  },
  /* 📌 뒤로 가기 버튼 (상단 왼쪽 고정) */
  backButton: {
    position: 'absolute',
    top: scaleSize(50), // ✅ 화면 상단에 배치
    left: scaleSize(20),
    backgroundColor: 'rgba(0,0,0,0.6)', // ✅ 더 진한 투명 배경 적용
    padding: scaleSize(14),
    borderRadius: scaleSize(50),
  },
  backText: {
    color: 'white',
    fontSize: scaleFont(22), // ✅ 버튼 크기 증가
    fontWeight: 'bold',
  },
});
