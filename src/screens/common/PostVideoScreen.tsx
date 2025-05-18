import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import styles, {
  dynamicVideoSize,
  inputFullWidth,
} from '../../styles/common/postVideoStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {createPost} from '../../api/postApi';
import {useUser} from '../../context/UserContext';
import {AppStackParamList} from '../../navigator/types';
import {launchImageLibrary} from 'react-native-image-picker';
import CommonButton from '../../styles/button';
import Icon from 'react-native-vector-icons/Feather';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as Progress from 'react-native-progress';

type NavigationProps = StackNavigationProp<
  AppStackParamList,
  'PostVideoScreen'
>;
type RouteProps = RouteProp<AppStackParamList, 'PostVideoScreen'>;

const PostVideoScreen: React.FC<{navigation: NavigationProps}> = ({}) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {user} = useUser();
  const route = useRoute<RouteProps>();
  const finalVideoUrl = route.params?.finalVideoUrl ?? null;
  const initialTitle = route.params?.title ?? '';
  const initialTags = route.params?.tags ?? '';

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [tags, setTags] = useState(initialTags);
  const [videoURI, setVideoURI] = useState<string | null>(finalVideoUrl);

  const handleTagInput = (text: string) => {
    const words = text.split(/[\s,]+/);
    const processed = words
      .filter(word => word.length > 0)
      .map(word => (word.startsWith('#') ? word : `#${word}`));
    const lastChar = text.slice(-1);
    const needsSpace = [' ', '\n', ','].includes(lastChar);
    setTags(processed.join(' ') + (needsSpace ? ' ' : ''));
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube.upload'],
      webClientId: 'YOUR_WEB_CLIENT_ID',
    });
  }, []);

  const handlePickVideo = async () => {
    try {
      setVideoLoading(true);
      const result = await launchImageLibrary({
        mediaType: 'video',
        selectionLimit: 1,
      });
      if (result.assets?.length) {
        const selected = result.assets[0];
        if (selected.uri) {
          setVideoURI(selected.uri);
        }
      }
    } catch (error) {
      console.error('미디어 선택 오류:', error);
    } finally {
      setVideoLoading(false);
    }
  };

  const uploadToMyServer = async () => {
    if (!videoURI) {
      Alert.alert('오류', '업로드할 영상을 선택해주세요.');
      return;
    }
    if (!user?.token) {
      Alert.alert('로그인이 필요합니다');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const blob = {
        uri: videoURI,
        type: 'video/mp4',
        name: 'video.mp4',
      } as unknown as File | Blob;

      const payload = {
        title: title.trim(),
        hashtags: tags.split(/[#,\s]+/).filter(Boolean),
        videoFile: blob,
      };

      const response = await createPost(payload);
      Alert.alert('성공', '업로드 완료');
      console.log('📤 업로드 성공:', response);
    } catch (err: any) {
      console.error('❌ 업로드 실패:', err?.response?.data || err.message);
      Alert.alert('에러', '업로드 실패');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.alignCenter}>
          <TouchableOpacity
            onPress={handlePickVideo}
            style={[styles.videoContainer, dynamicVideoSize(width)]}>
            {videoLoading ? (
              <ActivityIndicator size="large" color="#51BCB4" />
            ) : videoURI ? (
              <Video
                source={{uri: videoURI}}
                style={styles.fullSize}
                resizeMode="cover"
                repeat
                muted
              />
            ) : (
              <>
                <Icon
                  name="upload"
                  size={40}
                  color="#51BCB4"
                  style={styles.uploadIcon}
                />
                <Text style={styles.videoText}>동영상 파일 업로드</Text>
              </>
            )}
          </TouchableOpacity>

          <TextInput
            style={[styles.input, inputFullWidth(width)]}
            placeholder="제목"
            placeholderTextColor="#999999"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.inputMultiline, inputFullWidth(width)]}
            placeholder="태그 입력  ex) #GPT, #AI"
            placeholderTextColor="#999"
            value={tags}
            onChangeText={handleTagInput}
            multiline
          />
        </View>

        <View
          style={[
            styles.buttonContainer,
            inputFullWidth(width),
            {marginBottom: insets.bottom + 10},
          ]}>
          <CommonButton
            title="AIVIDEO 업로드"
            onPress={uploadToMyServer}
            type="primary"
            style={styles.halfWidthButton}
          />
        </View>

        {uploading && (
          <View style={styles.uploadProgressWrapper}>
            <Progress.Bar
              progress={uploadProgress / 100}
              width={width * 0.8}
              color="#51BCB4"
              borderColor="#ccc"
            />
            <Text style={styles.uploadProgressText}>
              {uploadProgress}% 업로드 중...
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PostVideoScreen;
