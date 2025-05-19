import {Platform, PermissionsAndroid, Alert} from 'react-native';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const saveVideoToLocal = async (videoUrl: string) => {
  try {
    const filename = `ai_video_${Date.now()}.mp4`;
    const localPath = `${RNFS.CachesDirectoryPath}/${filename}`;

    const result = await RNFS.downloadFile({
      fromUrl: videoUrl,
      toFile: localPath,
    }).promise;

    if (result.statusCode !== 200) {
      throw new Error(`다운로드 실패: ${result.statusCode}`);
    }

    if (Platform.OS === 'android') {
      const version = Platform.Version;

      if (version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('권한 거부됨', '비디오 접근 권한이 필요합니다.');
          return;
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('권한 거부됨', '저장소 접근 권한이 필요합니다.');
          return;
        }
      }
    }

    // ✅ 최신 방식
    await CameraRoll.saveAsset(localPath, {type: 'video'});

    Alert.alert('저장 완료', '영상이 기기에 저장되었습니다.');
  } catch (err) {
    console.error('❌ 저장 실패:', err);
    Alert.alert('오류', '영상 저장 중 문제가 발생했습니다.');
  }
};
