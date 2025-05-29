import React, {useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import {StackNavigationProp} from '@react-navigation/stack';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import {useUser} from '../../context/UserContext';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import IconGradientButton from '../../styles/IconGradientButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from '../../styles/common/resultScreenStyles';

type ShortsStackParamList = {
  ResultScreen: {
    videos: string[];
    subtitles: string[];
    music?: string;
    imageUrls?: string[]; // ✅ imageUrls 추가
  };
  URLPosting: {
    finalVideoUrl: string;
    imageUrls?: string[]; // ✅ 전달 시 타입 정의
  };
  Main: undefined;
};

type NavigationProps = StackNavigationProp<
  ShortsStackParamList,
  'ResultScreen'
>;

const ResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const {user} = useUser();
  const insets = useSafeAreaInsets();

  const {
    videos,
    subtitles,
    music,
    imageUrls = [], // ✅ 기본값으로 빈 배열
  } = route.params as ShortsStackParamList['ResultScreen'];

  const rawUrl = videos?.[0];
  const finalVideoUrl = rawUrl?.includes(':8000')
    ? rawUrl
    : rawUrl?.replace('http://3.35.182.180', 'http://3.35.182.180:8000');

  useEffect(() => {
    console.log('🎥 비디오 원본 URL:', rawUrl);
    console.log('🎉 재사용 URL:', finalVideoUrl);
    console.log('🖼️ imageUrls:', imageUrls); // ✅ 로그 찍기
  }, [rawUrl, finalVideoUrl]);

  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  const handleSave = async () => {
    if (!finalVideoUrl) {
      Alert.alert('에러', '저장할 영상이 없습니다.');
      return;
    }

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        const hasPermission =
          granted['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        if (!hasPermission) {
          Alert.alert('권한 거부', '저장을 위해 권한이 필요합니다.');
          return;
        }
      }

      const fileName = `video_${Date.now()}.mp4`;
      const localPath =
        Platform.OS === 'android'
          ? `${RNFS.CachesDirectoryPath}/${fileName}`
          : `${RNFS.TemporaryDirectoryPath}${fileName}`;

      const downloadResult = await RNFS.downloadFile({
        fromUrl: finalVideoUrl,
        toFile: localPath,
      }).promise;

      if (downloadResult.statusCode !== 200) {
        throw new Error(`다운로드 실패: ${downloadResult.statusCode}`);
      }

      await CameraRoll.save(localPath, {type: 'video'});
      Alert.alert('✅ 저장 완료', '영상이 갤러리에 저장되었습니다.');
    } catch (err) {
      console.error('❌ 저장 실패:', err);
      Alert.alert('에러', '영상 저장 중 문제가 발생했습니다.');
    }
  };

  const handlePost = () => {
    if (!finalVideoUrl) {
      Alert.alert('에러', '게시할 영상이 없습니다.');
      return;
    }

    navigation.navigate('URLPosting', {
      finalVideoUrl,
      imageUrls, // ✅ 함께 전달
    });
  };

  return (
    <View style={styles.container}>
      <AnimatedProgressBar progress={4 / 5} />

      <View style={[styles.videoBox, {marginBottom: 24}]}>
        {finalVideoUrl ? (
          <Video
            source={{uri: finalVideoUrl}}
            style={styles.video}
            resizeMode="contain"
            controls
            repeat
            paused={false}
          />
        ) : (
          <Text style={styles.errorText}>영상이 없습니다.</Text>
        )}
      </View>

      {/* ▶️ 하단 고정 버튼 */}
      <View
        style={[
          localStyles.bottomFixedButtons,
          {paddingBottom: insets.bottom || 16},
        ]}>
        <IconGradientButton
          title="포스팅"
          iconName="cloud-upload-outline"
          onPress={handlePost}
          variant="primary"
          style={{width: '100%', marginBottom: 16}}
        />

        <View style={localStyles.twoButtonsRow}>
          <IconGradientButton
            title="저장"
            iconName="save-outline"
            onPress={handleSave}
            variant="blue"
            style={{flex: 1}}
          />
          <IconGradientButton
            title="나가기"
            iconName="exit"
            onPress={handleExit}
            variant="gray"
            style={{flex: 1}}
          />
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  bottomFixedButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  twoButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default ResultScreen;
