import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const PostVideoScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      {/* 📌 제목 입력 (최상단 배치) */}
      <TextInput
        style={[
          styles.input,
          {width: width * 0.9, height: scaleSize(35, height), marginTop: 0},
        ]}
        placeholder="제목을 입력하세요"
        placeholderTextColor="#51BCB4"
        value={title}
        onChangeText={setTitle}
      />

      {/* ✅ 최종 결과물 */}
      <View
        style={[
          styles.videoContainer,
          {width: width * 0.8, height: height * 0.35},
        ]}>
        <Text style={[styles.videoText, {fontSize: scaleFont(18, width)}]}>
          최종결과물
        </Text>
      </View>

      {/* 📌 태그 입력 */}
      <TextInput
        style={[
          styles.input,
          {width: width * 0.9, height: scaleSize(60, height)},
        ]}
        placeholder="태그 텍스트 (Ex. #캡스톤, #컴펑)"
        placeholderTextColor="#51BCB4"
        value={tags}
        onChangeText={setTags}
        multiline
      />

      {/* 📌 하단 버튼 */}
      <View
        style={[
          styles.buttonContainer,
          {width: width * 0.9, marginTop: scaleSize(10, height)},
        ]}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.exitButton,
            {width: width * 0.4, height: scaleSize(45, height)},
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, {fontSize: scaleFont(16, width)}]}>
            나가기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.postButton,
            {width: width * 0.4, height: scaleSize(45, height)},
          ]}>
          <Text style={[styles.buttonText, {fontSize: scaleFont(16, width)}]}>
            게시
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#51BCB4',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: scaleSize(10, 375),
  },
  videoText: {
    color: '#51BCB4',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#51BCB4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#51BCB4',
    marginVertical: scaleSize(8, 375),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleSize(10, 375),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  exitButton: {
    backgroundColor: '#ccc',
  },
  postButton: {
    backgroundColor: '#51BCB4',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
});

export default PostVideoScreen;
