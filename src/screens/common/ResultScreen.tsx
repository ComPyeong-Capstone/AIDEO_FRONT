import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

import {styles} from '../../styles/common/resultScreenStyles';
import {scaleSize} from '../../styles/responsive';
import {StackNavigationProp} from '@react-navigation/stack';

type ShortsStackParamList = {
  ResultScreen: {videos: string[]; subtitles: string[]; music?: string};
  Main: undefined;
};

type NavigationProps = StackNavigationProp<
  ShortsStackParamList,
  'ResultScreen'
>;

const ResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const {videos, subtitles, music} = route.params as {
    videos: string[];
    subtitles: string[];
    music?: string;
  };

  const rawUrl = videos?.[0];
  const finalVideoUrl = rawUrl?.includes(':8000')
    ? rawUrl
    : rawUrl?.replace('http://3.35.182.180', 'http://3.35.182.180:8000');

  useEffect(() => {
    console.log('🎥 비디오 원본 URL:', rawUrl);
    console.log('🚀 재생용 URL:', finalVideoUrl);
  }, [rawUrl]);

  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  const handleSave = () => {
    Alert.alert('저장', '로컬 저장 기능은 추후 지원 예정입니다.');
  };

  const handlePost = () => {
    Alert.alert('포스팅', '게시 기능은 추후 구현됩니다.');
  };

  return (
    <View style={styles.container}>
      {/* ✅ 최종 영상 미리보기 */}
      <View style={styles.videoBox}>
        {finalVideoUrl ? (
          <Video
            source={{uri: finalVideoUrl}}
            style={styles.video}
            resizeMode="contain"
            controls
            repeat
            paused={false}
            onLoad={data => console.log('✅ 비디오 로드 성공:', data)}
            onError={err => console.error('❌ 비디오 로드 실패:', err)}
            onBuffer={info => console.log('⏳ 버퍼링 중:', info)}
          />
        ) : (
          <Text style={styles.errorText}>영상이 없습니다.</Text>
        )}
      </View>

      {/* ✅ 버튼 영역 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Icon
            name="cloud-upload-outline"
            size={scaleSize(24)}
            color="white"
          />
          <Text style={styles.buttonText}>포스팅</Text>
        </TouchableOpacity>

        <View style={styles.smallButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <View style={styles.iconWithText}>
              <Icon name="save-outline" size={18} color="#fff" />
              <Text style={styles.smallButtonText}>저장</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
            <Text style={styles.smallButtonText}>나가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResultScreen;
