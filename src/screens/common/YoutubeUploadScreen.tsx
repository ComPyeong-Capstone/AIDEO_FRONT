import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/common/postVideoStyles';
import CommonButton from '../../styles/button';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import IconGradientButton from '../../styles/IconGradientButton';

const YouTubeUploadScreen = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  const { videoURI } = route.params as { videoURI: string };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacyStatus, setPrivacyStatus] = useState<'public' | 'unlisted' | 'private'>('unlisted');

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('제목 입력', 'YouTube에 업로드할 제목을 입력해주세요.');
      return;
    }

    try {
      // ✅ 1. 구글 accessToken 가져오기
      const { accessToken: googleAccessToken } = await GoogleSignin.getTokens();
      console.log('🟢 Google AccessToken:', googleAccessToken);

      // ✅ 2. snippet 및 status 설정
      const metadata = {
        snippet: {
          title,
          description,
          tags: ['ai', 'video'],
          categoryId: '22', // 일반: People & Blogs
        },
        status: {
          privacyStatus, // 'public', 'unlisted', 'private'
        },
      };

      // ✅ 3. FormData 구성 (multipart 업로드)
      const formData = new FormData();
      formData.append('metadata', {
        name: 'metadata',
        type: 'application/json',
        string: JSON.stringify(metadata),
      } as any);

      formData.append('video', {
        uri: videoURI,
        type: 'video/mp4',
        name: 'upload.mp4',
      } as any);

      // ✅ 4. axios로 업로드 요청
      const response = await axios.post(
        'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status',
        formData,
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('✅ 유튜브 업로드 성공:', response.data);
      Alert.alert('성공', 'YouTube에 업로드 완료!');
      navigation.goBack();
    } catch (err: any) {
      console.error('❌ 유튜브 업로드 실패:', err.response?.data || err.message);
      Alert.alert('실패', 'YouTube 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={[styles.input, { width: width * 0.9 }]}
          placeholder="YouTube 제목"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.inputMultiline, { width: width * 0.9 }]}
          placeholder="YouTube 설명"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: width * 0.9,
          marginVertical: 20,
        }}>
          {['public', 'unlisted', 'private'].map(status => (
            <TouchableOpacity key={status} onPress={() => setPrivacyStatus(status as any)}>
              <Text style={{
                color: privacyStatus === status ? '#51BCB4' : '#999',
                fontWeight: 'bold',
              }}>
                {status === 'public' ? '공개' : status === 'unlisted' ? '일부 공개' : '비공개'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <IconGradientButton
          title="YouTube 업로드"
          onPress={handleSubmit}
   variant="youtube"
     iconName="logo-youtube"

             style={{ width: width * 0.6 }}
        />

      </View>
    </SafeAreaView>
  );
};

export default YouTubeUploadScreen;
