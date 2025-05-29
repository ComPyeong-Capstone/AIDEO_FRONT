import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import {generateFinalVideo} from '../../api/generateApi';
import CustomButton from '../../styles/button';
import styles from '../../styles/common/effectPreviewStyles';
import Video from 'react-native-video';

const FONT_EFFECTS = ['poping', 'split'] as const;
type FontEffect = (typeof FONT_EFFECTS)[number];

type NavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'EffectPreviewScreen'
>;

const SAMPLE_VIDEO_MAP: Record<FontEffect, string> = {
  poping:
    'https://compyeong-capstone-s3bucket.s3.ap-northeast-2.amazonaws.com/sample-video/poping.mp4',
  split:
    'https://compyeong-capstone-s3bucket.s3.ap-northeast-2.amazonaws.com/sample-video/split.mp4',
};

const EffectPreviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const {
    videos,
    subtitles,
    music,
    font_path,
    font_color,
    subtitle_y_position,
    imageUrls = [], // ✅ imageUrls 추가
  } = route.params as ShortsStackParamList['EffectPreviewScreen'] & {
    imageUrls?: string[];
  };

  const [selectedEffect, setSelectedEffect] = useState<FontEffect>('poping');
  const [previewVideoUrl, setPreviewVideoUrl] = useState(
    SAMPLE_VIDEO_MAP['poping'],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviewVideoUrl(SAMPLE_VIDEO_MAP[selectedEffect]);
  }, [selectedEffect]);

  useEffect(() => {
    console.log('📦 EffectPreviewScreen 전달된 params:', {
      videos,
      subtitles,
      music,
      font_path,
      font_color,
      subtitle_y_position,
    });
    console.log('🖼️ imageUrls:', imageUrls); // ✅ 로그 출력
  }, []);

  const handleGenerateFinalVideo = async () => {
    try {
      setLoading(true);

      const cleanedVideoFilenames = videos.map(v => v.split('/').pop() || '');
      const cleanedMusic =
        music && typeof music === 'string' && music.includes('/')
          ? music.split('/').pop() || 'bgm_01.mp3'
          : 'bgm_01.mp3';

      const payload = {
        videos: cleanedVideoFilenames,
        subtitles,
        music_url: cleanedMusic,
        font_path,
        font_effect: selectedEffect,
        font_color,
        subtitle_y_position,
      };

      console.log('🎬 [최종 영상 생성 요청]', payload);

      const response = await generateFinalVideo(payload);

      navigation.navigate('ResultScreen', {
        videos: [response.final_video_url],
        subtitles,
        music,
        imageUrls, // ✅ 함께 전달
      });
    } catch (e) {
      Alert.alert('에러', '최종 영상 생성 실패');
      console.error('❌ 영상 생성 에러:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>자막 효과 미리보기</Text>

      <View style={styles.videoContainer}>
        <Video
          source={{uri: previewVideoUrl}}
          style={styles.video}
          resizeMode="cover"
          repeat
          muted={false}
          paused={false}
        />
      </View>

      <Text style={styles.label}>효과 선택</Text>

      <View style={styles.effectList}>
        {FONT_EFFECTS.map(effect => (
          <TouchableOpacity
            key={effect}
            onPress={() => setSelectedEffect(effect)}
            style={[
              styles.effectButton,
              selectedEffect === effect && styles.selectedEffectButton,
            ]}>
            <Text
              style={[
                styles.effectText,
                selectedEffect === effect && styles.selectedEffectText,
              ]}>
              {effect}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollBottom}>
        <CustomButton
          title="최종 영상 생성"
          onPress={handleGenerateFinalVideo}
          disabled={loading}
          type="primary"
          style={styles.fullButton}
        />
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>영상 생성 중...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default EffectPreviewScreen;
