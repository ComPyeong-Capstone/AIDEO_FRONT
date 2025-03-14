import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from '../../styles/shorts/PostScreenStyles'; // ✅ 스타일 파일 분리
import {StackNavigationProp} from '@react-navigation/stack';
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

// 📌 네비게이션 타입 정의
type RootStackParamList = {
  PostVideoScreen: undefined;
  FinalVideoScreen: undefined;
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'PostVideoScreen'>;
}

const PostVideoScreen: React.FC<Props> = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      {/* 📌 제목 입력 */}
      <TextInput
        style={[styles.input, {width: width * 0.9}]}
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
        <Text style={styles.videoText}>최종결과물</Text>
      </View>

      {/* 📌 태그 입력 */}
      <TextInput
        style={[styles.input, {width: width * 0.9, height: 60}]}
        placeholder="태그 텍스트 (Ex. #캡스톤, #컴펑)"
        placeholderTextColor="#51BCB4"
        value={tags}
        onChangeText={setTags}
        multiline
      />

      {/* 📌 하단 버튼 */}
      <View style={[styles.buttonContainer, {width: width * 0.9}]}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>나가기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate('FinalVideoScreen')}>
          <Text style={styles.buttonText}>게시</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostVideoScreen;
