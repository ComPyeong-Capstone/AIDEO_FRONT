import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // ✅ 모달을 아래쪽 정렬
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 350, // ✅ 기존보다 위로 50px 이동
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // ✅ Android 그림자 효과
  },
  button: {
    width: '100%',
    backgroundColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
