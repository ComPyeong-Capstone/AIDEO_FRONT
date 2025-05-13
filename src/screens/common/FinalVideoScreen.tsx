import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';

import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import styles from '../../styles/common/finalVideoStyles';
import ProgressBar from '../../components/ProgressBar';
import CustomButton from '../../styles/button';
import {generatePartialVideo, generateFinalVideo} from '../../api/generateApi';

type NavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'FinalVideoScreen'
>;

interface Props {
  navigation: NavigationProp;
}

const FinalVideoScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {
    from = 'photo',
    duration,
    prompt,
    imageUrls = [],
    subtitles = [],
    music = 'bgm_01.mp3',
    videos: preGeneratedVideos = [],
  } = route.params as {
    from?: 'photo' | 'shorts';
    duration?: number;
    prompt: string;
    imageUrls?: string[];
    subtitles?: string[];
    music?: string;
    videos?: string[];
  };

  const currentStep = from === 'photo' ? 3 : 4;

  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (from === 'photo') {
      setVideoUrls(preGeneratedVideos);
      return;
    }

    const generateVideos = async () => {
      try {
        setLoading(true);
        const count = Math.floor((duration ?? 0) / 5);
        const trimmedImageUrls = imageUrls.slice(0, count);
        const trimmedSubtitles = subtitles.slice(0, count);

        if (
          trimmedImageUrls.length !== count ||
          trimmedSubtitles.length !== count
        ) {
          Alert.alert(
            '데이터 부족',
            `${count}개의 이미지와 자막이 필요합니다.`,
          );
          return;
        }

        const imageFilenames = trimmedImageUrls.map(url => {
          const segments = url.split('/');
          return segments[segments.length - 1];
        });

        const response = await generatePartialVideo({
          images: imageFilenames,
          subtitles: trimmedSubtitles,
        });

        setVideoUrls(response.video_urls);
      } catch (error) {
        console.error('부분 영상 생성 실패:', error);
        Alert.alert('에러', '부분 영상 생성에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    generateVideos();
  }, [from, imageUrls, subtitles, duration, preGeneratedVideos]);

  const handleGenerateFinalVideo = async () => {
    try {
      setLoading(true);
      const finalRes = await generateFinalVideo({
        videos: videoUrls,
        subtitles,
        music_url: music,
        font_path: '/System/Library/Fonts/AppleSDGothicNeo.ttc',
        font_effect: 'poping',
        font_color: 'white',
        subtitle_y_position: -150,
      });

      navigation.navigate('ResultScreen', {
        videos: [finalRes.final_video_url],
        subtitles,
        music,
      });
    } catch (error) {
      console.error('최종 영상 생성 실패:', error);
      Alert.alert('에러', '최종 영상 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.progressBarWrapper, {marginTop: insets.top}]}>
        <ProgressBar currentStep={currentStep} mode={from} />
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.videoWrapper}>
          {loading ? (
            <View style={styles.videoItem}>
              <ActivityIndicator size="large" color="#00A6FB" />
              <Text style={styles.videoText}>영상 생성 중...</Text>
            </View>
          ) : (
            <Swiper
              loop={false}
              showsButtons={false}
              activeDotColor="#00A6FB"
              dotColor="#D9D9D9"
              paginationStyle={styles.pagination}
              containerStyle={styles.swiperContainer}>
              {videoUrls.length > 0 ? (
                videoUrls.map((url, index) => (
                  <View key={index} style={styles.videoItem}>
                    <Video
                      source={{uri: url}}
                      style={styles.videoPlayer}
                      resizeMode="cover"
                      repeat
                      muted
                      controls
                    />
                  </View>
                ))
              ) : (
                <View style={styles.videoItem}>
                  <Text style={styles.videoText}>영상 없음</Text>
                </View>
              )}
            </Swiper>
          )}
        </View>
      </View>

      <View style={styles.musicSpacing} />
      <TouchableOpacity
        style={styles.musicButton}
        onPress={() =>
          navigation.navigate('MusicSelectionScreen', {
            duration: duration ?? 0,
            prompt,
            imageUrls,
            subtitles,
            music,
          })
        }>
        <Text style={styles.buttonText}>배경 음악</Text>
      </TouchableOpacity>

      <View style={[styles.buttonContainer, {bottom: insets.bottom + 10}]}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
          style={[styles.button, styles.prevButton]}
          textStyle={styles.buttonText}
        />
        <CustomButton
          title="영상 생성"
          onPress={handleGenerateFinalVideo}
          disabled={loading || videoUrls.length === 0}
          type="primary"
          style={[styles.button, styles.nextButton]}
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
};

export default FinalVideoScreen;
