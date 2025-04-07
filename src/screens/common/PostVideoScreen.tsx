import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from '../../styles/common/PostScreenStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {createPost} from '../../api/postApi';
import {useUser} from '../../context/UserContext';
import {AppStackParamList} from '../../navigator/types';

interface Props {
  navigation: StackNavigationProp<AppStackParamList, 'PostVideoScreen'>;
}

const PostVideoScreen: React.FC<Props> = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {user} = useUser();

  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  const handlePost = async () => {
    if (!user) {
      Alert.alert('에러', '로그인 정보가 없습니다.');
      return;
    }

    try {
      const payload = {
        title,
        videoURL: 'https://example.com/test.mp4', // 실제 업로드 URL로 교체 가능
        hashtags: tags
          .split('#')
          .map(tag => tag.trim())
          .filter(tag => tag !== ''),
      };

      await createPost(payload);

      Alert.alert('게시 완료', '게시물이 성공적으로 등록되었습니다.');

      navigation.navigate('Main', {
        screen: 'Home',
        params: {
          newPost: {
            id: String(Date.now()), // 임시 ID
            title: payload.title,
            creator: user.userName,
            thumbnail: 'https://via.placeholder.com/150',
          },
        },
      });
    } catch (error) {
      console.error(error);
      Alert.alert('에러', '게시물 등록에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      {/* 제목 입력 */}
      <TextInput
        style={[styles.input, {width: width * 0.9}]}
        placeholder="제목을 입력하세요"
        placeholderTextColor="#51BCB4"
        value={title}
        onChangeText={setTitle}
      />

      {/* 영상 결과물 (미리보기) */}
      <View
        style={[
          styles.videoContainer,
          {width: width * 0.8, height: height * 0.35},
        ]}>
        <Text style={styles.videoText}>최종결과물</Text>
      </View>

      {/* 해시태그 입력 */}
      <TextInput
        style={[styles.input, styles.inputMultiline, {width: width * 0.9}]}
        placeholder="태그 텍스트 (Ex. #캡스톤, #컴펑)"
        placeholderTextColor="#51BCB4"
        value={tags}
        onChangeText={setTags}
        multiline
      />

      {/* 버튼 영역 */}
      <View style={[styles.buttonContainer, {width: width * 0.9}]}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>나가기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.buttonText}>게시</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostVideoScreen;
