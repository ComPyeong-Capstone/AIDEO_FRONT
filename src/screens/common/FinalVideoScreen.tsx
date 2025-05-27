import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  PanResponder,
} from 'react-native';
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styles from '../../styles/common/finalVideoStyles';
import CustomButton from '../../styles/button';
import {regenerateSinglePartialVideo} from '../../api/generateApi';

const FinalVideoScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const {
    from = 'shorts',
    duration,
    prompt,
    imageUrls = [],
    images = [],
    subtitles = [],
    music = 'bgm_01.mp3',
    musicTitle = '',
    videos: preGeneratedVideos = [],
    files = [],
    previewImage = '',
  } = route.params as {
    from?: 'shorts' | 'photo';
    duration?: number;
    prompt: string;
    imageUrls?: string[];
    images?: {id: string; uri: string | null; name?: string}[];
    subtitles?: string[];
    music?: string;
    musicTitle?: string;
    videos?: string[];
    files?: {
      uri: string;
      name: string;
      type: string;
    }[];
    previewImage?: string;
  };

  const [videoUrls, setVideoUrls] = useState<string[]>(preGeneratedVideos);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('🎬 FinalVideoScreen mounted');
    console.log('🖼️ previewImage:', previewImage);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          if (from === 'photo') {
            navigation.navigate('PhotoStack', {
              screen: 'PhotoPromptScreen',
              params: {duration: duration ?? 0},
            });
          } else {
            navigation.navigate('ShortsStack', {
              screen: 'ImageSelectionScreen',
              params: {
                duration: duration ?? 0,
                prompt,
                imageUrls,
                subtitles,
                videos: videoUrls,
              },
            });
          }
        }
      },
    }),
  ).current;

  const regenerateSelectedVideo = async () => {
    const subtitle = subtitles[selectedIndex] || '';
    let imageFileName = '';

    if (from === 'photo') {
      const file = files?.[selectedIndex];
      const image = images?.[selectedIndex];

      if (file?.name) {
        imageFileName = file.name;
      } else if (image?.name) {
        imageFileName = image.name;
      } else if (image?.uri) {
        imageFileName =
          image.uri.split('/').pop() || `image_${selectedIndex}.jpg`;
      } else {
        Alert.alert('에러', '파일 이름을 찾을 수 없습니다.');
        return;
      }
    } else {
      const selectedImage = imageUrls[selectedIndex];
      if (!selectedImage) {
        Alert.alert('에러', '이미지를 찾을 수 없습니다.');
        return;
      }
      imageFileName = selectedImage.split('/').pop() || '';
    }

    try {
      setLoading(true);
      const response = await regenerateSinglePartialVideo({
        image: imageFileName,
        subtitle,
        number: selectedIndex + 1,
      });

      const updated = [...videoUrls];
      updated[selectedIndex] = response.video_url;
      setVideoUrls(updated);
    } catch (error) {
      console.error('❌ 부분 영상 재생성 실패:', error);
      Alert.alert('에러', '부분 영상 재생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSubtitleSettings = () => {
    const subtitleParams = {
      videos: videoUrls,
      subtitles,
      music,
      previewImage,
    };

    if (from === 'photo') {
      navigation.navigate('PhotoStack', {
        screen: 'SubtitlesSettingScreen',
        params: {
          from: 'photo',
          ...subtitleParams,
        },
      });
    } else {
      navigation.navigate('ShortsStack', {
        screen: 'SubtitlesSettingScreen',
        params: subtitleParams,
      });
    }
  };

  const handleNavigateToMusic = () => {
    const musicParams = {
      prompt,
      music,
      musicTitle,
      videos: videoUrls,
      previewImage, // ✅ 반드시 포함
    };

    if (from === 'photo') {
      navigation.navigate('PhotoStack', {
        screen: 'MusicSelectionScreen',
        params: {
          from: 'photo',
          images,
          subtitles,
          files,
          ...musicParams,
        },
      });
    } else {
      navigation.navigate('ShortsStack', {
        screen: 'MusicSelectionScreen',
        params: {
          duration: duration ?? 0,
          imageUrls,
          subtitles,
          ...musicParams,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedProgressBar progress={3 / 5} />

      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.headerContainer}>
          <View style={styles.titleCenterWrapper}>
            <Text style={styles.imageNumberText}>
              {videoUrls.length > 0 ? `${selectedIndex + 1}번 영상` : ''}
            </Text>
          </View>
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
          onPress={handleNavigateToMusic}>
          <Text style={styles.buttonText}>배경 음악</Text>
        </TouchableOpacity>
        <Text style={styles.musicLabel}>
          선택된 음악: {musicTitle || '없음'}
        </Text>

        <View
          style={[
            styles.fixedButtonWrapper,
            {paddingBottom: insets.bottom, gap: 12, justifyContent: 'center'},
          ]}>
          <CustomButton
            title="부분 영상 재생성"
            onPress={regenerateSelectedVideo}
            type="gray"
            style={{flex: 1, width: '45%', height: 42}}
            textStyle={styles.buttonText}
            disabled={loading}
          />
          <CustomButton
            title="자막 설정"
            onPress={handleGoToSubtitleSettings}
            disabled={loading || videoUrls.length === 0}
            type="gradient"
            style={{flex: 1, width: '45%', height: 42}}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FinalVideoScreen;
