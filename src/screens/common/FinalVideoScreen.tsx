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
import {generatePartialVideo} from '../../api/generateApi';

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

  const handleGoToSubtitleSettings = () => {
    navigation.navigate('SubtitlesSettingScreen', {
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
          title="자막 설정"
          onPress={handleGoToSubtitleSettings}
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
