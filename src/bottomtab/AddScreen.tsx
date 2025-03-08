import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'; // ✅ 네비게이션 추가

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const AddScreen = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation(); // ✅ 네비게이션 훅 사용

  return (
    <SafeAreaView style={styles.container}>
      {/* 버튼 컨테이너 */}
      <View style={styles.buttonWrapper}>
        {/* ✅ 쇼츠용 영상 버튼 (ShortsNavigator로 이동) */}
        <TouchableOpacity
          style={[
            styles.button,
            {height: scaleSize(60, width), marginBottom: scaleSize(15, width)},
          ]}
          onPress={() => navigation.navigate('ShortsStack')} // ✅ ShortsNavigator로 이동
        >
          <Text style={[styles.buttonText, {fontSize: scaleFont(18, width)}]}>
            쇼츠용 영상
          </Text>
        </TouchableOpacity>

        {/* ✅ 내 사진 영상 버튼 (PhotoNavigator > VideoLengthScreen 이동) */}
        <TouchableOpacity
          style={[styles.button, {height: scaleSize(60, width)}]}
          onPress={() => navigation.navigate('PhotoStack')} // ✅ ShortsNavigator로 이동
        >
          <Text style={[styles.buttonText, {fontSize: scaleFont(18, width)}]}>
            내 사진 영상
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(10, 375),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
});

export default AddScreen;
