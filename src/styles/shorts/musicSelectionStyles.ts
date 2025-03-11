import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#51BCB4',
    marginVertical: 10,
    paddingVertical: 10,
    width: '90%',
    borderRadius: 12,
  },
  selectedMusic: {
    backgroundColor: '#3E5C76', // ✅ 선택된 음악 배경색
  },
  unselectedMusic: {
    backgroundColor: 'transparent', // ✅ 선택되지 않은 음악
  },
  musicText: {
    color: '#51BCB4',
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 12,
  },
  selectButtonText: {
    color: '#51BCB4',
    fontWeight: 'bold',
  },
  prevButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#51BCB4',
    fontWeight: 'bold',
  },
});
