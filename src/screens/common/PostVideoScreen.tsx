import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
    useWindowDimensions,
Platform,
} from 'react-native';
import Video from 'react-native-video';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from '../../styles/common/postVideoStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {createPost} from '../../api/postApi';
import {useUser} from '../../context/UserContext';
import {AppStackParamList} from '../../navigator/types';
import {launchImageLibrary} from 'react-native-image-picker';
import CommonButton from '../../styles/button';
import Icon from 'react-native-vector-icons/Feather';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {BASE_URL} from '@env';

interface Props {
  navigation: StackNavigationProp<AppStackParamList, 'PostVideoScreen'>;
}


const PostVideoScreen: React.FC<Props> = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {user} = useUser();

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [videoURI, setVideoURI] = useState<string | null>(null);
  const handleTagInput = (text: string) => {
    const words = text.split(/[\s\n]+/); // 단어 단위 분할

    const processed = words
      .filter(word => word.length > 0) // 빈 문자열 제거
      .map(word => (word.startsWith('#') ? word : `#${word}`)); // # 붙이기

    const lastChar = text.slice(-1);
    const needsSpace = lastChar === ' ' || lastChar === '\n';

    setTags(processed.join(' ') + (needsSpace ? ' ' : ''));
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube.upload'],
      webClientId: 'YOUR_WEB_CLIENT_ID',
    });
  }, []);
useEffect(() => {
  const fetchToken = async () => {
    const savedToken = await getAccessToken();
    console.log('🧾 저장된 토큰 from 스토리지:', savedToken);
  };
  fetchToken();
}, []);

  const handlePickVideo = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'video', selectionLimit: 1});
      if (result.assets?.length) {
        const selected = result.assets[0];
        if (selected.uri) setVideoURI(selected.uri);
      }
    } catch (error) {
      console.error('미디어 선택 오류:', error);
    }
  };

  const uploadToYouTube = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const token = (await GoogleSignin.getTokens()).accessToken;

      const form = new FormData();
      form.append('video', {
        uri: videoURI,
        type: 'video/mp4',
        name: 'upload.mp4',
      } as any);
      form.append('snippet', JSON.stringify({ title: title || 'Untitled', description: tags }));
      form.append('status', JSON.stringify({ privacyStatus: 'unlisted' }));

      const response = await axios.post(
        'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status',
        form,
        {
          headers: {
  Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
          params: { uploadType: 'multipart' },
        }
      );

      Alert.alert('YouTube 업로드 완료', '영상이 YouTube에 업로드되었습니다.');
      console.log('YouTube 업로드 성공:', response.data);
    } catch (error: any) {
      console.error('YouTube 업로드 실패:', error?.response || error);
      Alert.alert('에러', 'YouTube 업로드에 실패했습니다.');
    }
  };


const uploadToMyServer = async (title: string, tags: string, videoURI: string | null, token: string | undefined) => {
  if (!videoURI) {
    Alert.alert('오류', '업로드할 영상을 선택해주세요.');
    return;
  }
console.log('user:', user);
console.log('user?.token:', user?.token);
if (!user?.token) {
  Alert.alert('로그인이 필요합니다', '토큰이 없어 업로드할 수 없습니다.');
  return;
}

  try {
    const formData = new FormData();

    // ✅ 1. postDTO 객체 생성 및 JSON 문자열로 감싸기
    const postDTO = {
      title: title.trim(),
      hashtags: tags.split(/[#,\s]+/).filter(Boolean),
    };

    formData.append('postDTO', {
      name: 'postDTO',
      type: 'application/json',
      string: JSON.stringify(postDTO),
      uri: Platform.OS === 'ios' ? undefined : '', // 안드로이드는 '' 필요, iOS는 생략 가능
    } as any);

    // ✅ 2. videoFile 추가
    formData.append('videoFile', {
      uri: videoURI,
      type: 'video/mp4',
      name: 'video.mp4',
    } as any);

    // ✅ 3. 전송
    const response = await axios.post(`${BASE_URL}:8080/posts/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (data, headers) => {
        return data;
      },
    });
console.log('user?.token:', user?.token);

    console.log('✅ 업로드 성공:', response.data);
    Alert.alert('업로드 성공', '서버에 영상이 성공적으로 업로드되었습니다.');
  } catch (error: any) {
    console.error('🚨 업로드 실패:', error?.response?.data || error.message);
    Alert.alert('업로드 실패', '서버 업로드 중 문제가 발생했습니다.');
  }
};



  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top, flex: 1}]}>
      <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
        <TextInput
          style={[styles.input, {width: width * 0.9, marginTop: 10}]}
          placeholder="제목을 입력하세요"
          placeholderTextColor="#999999"
          value={title}
          onChangeText={setTitle}

        />

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.videoContainer, {width: width * 0.8, height: height * 0.35}]}
            onPress={handlePickVideo}
            activeOpacity={0.7}>
            {videoURI ? (
              <Video
                source={{uri: videoURI}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                repeat
                muted
              />
            ) : (
              <>
                <Icon name="upload" size={40} color="#51BCB4" style={{marginBottom: 20}} />
                <Text style={styles.videoText}>동영상 파일 업로드</Text>
              </>
            )}
          </TouchableOpacity>

    <TextInput
      style={[styles.input, styles.inputMultiline, {width: width * 0.9}]}
      placeholder="태그 텍스트 (Ex. #캡스톤, #컴펑)"
      placeholderTextColor="#999"
      value={tags}
      onChangeText={handleTagInput}
      multiline
    />


        </View>

        <View style={[styles.buttonContainer, {width: width * 0.9, marginBottom: insets.bottom + 10}]}>
          <CommonButton title="YouTube 업로드" onPress={uploadToYouTube} type="secondary" style={{width: width * 0.4}} />
<CommonButton
  title="내 서버에 업로드"
  onPress={() => uploadToMyServer(title, tags, videoURI, user?.token)}
  type="primary"
  style={{width: width * 0.4}}
/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostVideoScreen;