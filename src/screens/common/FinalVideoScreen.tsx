import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';

import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import styles from '../../styles/common/finalVideoStyles';
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
  const route = useRoute();
  const {
    duration,
    prompt,
    imageUrls = [],
    subtitles = [],
    music = 'bgm_01.mp3',
    musicTitle = '',
    videos: preGeneratedVideos = [],
  } = route.params as {
    from?: 'photo' | 'shorts';
    duration?: number;
    prompt: string;
    imageUrls?: string[];
    subtitles?: string[];
    music?: string;
    musicTitle?: string;
    videos?: string[];
  };

  const [videoUrls, setVideoUrls] = useState<string[]>(preGeneratedVideos);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (videoUrls.length > 0) return;

    const generateVideos = async () => {
      try {
        setLoading(true);
        const count = Math.floor((duration ?? 0) / 5);
        const trimmedImages = imageUrls.slice(0, count);
        const trimmedSubs = subtitles.slice(0, count);

        if (trimmedImages.length !== count || trimmedSubs.length !== count) {
          Alert.alert(
            '데이터 부족',
            `${count}개의 이미지와 자막이 필요합니다.`,
          );
          return;
        }

        const imageFilenames = trimmedImages.map(
          url => url.split('/').pop() || '',
        );

        const response = await generatePartialVideo({
          images: imageFilenames,
          subtitles: trimmedSubs,
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
  }, [duration, imageUrls, subtitles, videoUrls.length]);

  const handleGenerateFinalVideo = async () => {
    if (videoUrls.length === 0 || subtitles.length === 0) {
      Alert.alert('에러', '영상 또는 자막이 비어 있습니다.');
      return;
    }

    try {
      setLoading(true);

      const cleanedVideoFilenames = videoUrls
        .map(url => url.split('/').pop() || '')
        .filter(Boolean);
      const cleanedSubtitles = subtitles.filter(s => s.trim() !== '');
      const cleanedMusic = music?.split('/').pop() || 'bgm_01.mp3';

      const requestBody = {
        videos: cleanedVideoFilenames,
        subtitles: cleanedSubtitles,
        music_url: cleanedMusic,
        font_path: '../font/Cafe24Ssurround-v2.0/Cafe24Ssurround-v2.0.ttf',
        font_effect: 'split',
        font_color: 'white',
        subtitle_y_position: -150,
      };

      const finalRes = await generateFinalVideo(requestBody);

      const fixedFinalUrl = finalRes.final_video_url.includes(':8000')
        ? finalRes.final_video_url
        : finalRes.final_video_url.replace(
            'http://3.35.182.180',
            'http://3.35.182.180:8000',
          );

      navigation.navigate('ResultScreen', {
        videos: [fixedFinalUrl],
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

  const handleBack = () => {
    navigation.navigate('ImageSelectionScreen', {
      duration: duration ?? 0,
      prompt,
      imageUrls,
      subtitles,
      videos: videoUrls,
    });
  };

  const handleForward = () => {
    navigation.navigate('ResultScreen', {
      videos: videoUrls,
      subtitles,
      music,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.navIcon}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.titleCenterWrapper}>
          <Text style={styles.imageNumberText}>
            {videoUrls.length > 0 ? `${selectedIndex + 1}번 영상` : ''}
          </Text>
        </View>

        <TouchableOpacity onPress={handleForward}>
          <Text style={styles.navIcon}>{'>'}</Text>
        </TouchableOpacity>
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
              showsPagination={false}
              onIndexChanged={setSelectedIndex}
              containerStyle={styles.swiperContainer}>
              {videoUrls.map((url, index) => (
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
              ))}
            </Swiper>
          )}
        </View>

        {videoUrls.length > 0 && (
          <View style={styles.dotWrapper}>
            {videoUrls.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === selectedIndex
                    ? styles.dotActive
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        )}
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
            musicTitle,
            videos: videoUrls,
          })
        }>
        <Text style={styles.buttonText}>배경 음악</Text>
      </TouchableOpacity>
      <Text style={styles.musicLabel}>선택된 음악: {musicTitle || '없음'}</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="부분 영상 재생성"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'ImageSelectionScreen',
                  params: {
                    duration,
                    prompt,
                    imageUrls,
                    subtitles,
                  },
                },
              ],
            });
          }}
          type="secondary"
          style={styles.prevButton}
          textStyle={styles.buttonText}
        />
        <CustomButton
          title="영상 생성"
          onPress={handleGenerateFinalVideo}
          disabled={loading || videoUrls.length === 0}
          type="primary"
          style={styles.nextButton}
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
};

export default FinalVideoScreen;
