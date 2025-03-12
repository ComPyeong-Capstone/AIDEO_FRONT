import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // ✅ 버튼을 아래로 위치 조정
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // ✅ 반투명한 배경색
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40, // ✅ 아래쪽으로 더 내리기
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
