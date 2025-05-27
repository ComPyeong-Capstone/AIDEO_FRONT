import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {styles} from '../../styles/shorts/imageSelectionStyles';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import {regenerateImage, generatePartialVideo} from '../../api/generateApi';

interface RouteParams {
  imageUrls: string[];
  subtitles: string[];
  duration: number;
  prompt: string;
  videos?: string[];
}

type Props = NativeStackScreenProps<
  ShortsStackParamList,
  'ImageSelectionScreen'
>;

const ImageSelectionScreen: React.FC<Props> = ({navigation, route}) => {
  const {
    imageUrls: initialImageUrls,
    subtitles: initialSubtitles,
    duration,
    prompt,
    videos: existingVideos,
  }: RouteParams = route.params;

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [subtitles, setSubtitles] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [captionText, setCaptionText] = useState('');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const filteredImages = initialImageUrls.filter(
      url => typeof url === 'string' && url.startsWith('http'),
    );

    if (filteredImages.length !== initialImageUrls.length) {
      console.warn('⚠️ 유효하지 않은 이미지 URL이 필터링되었습니다.');
    }

    setImageUrls(filteredImages);
    setSubtitles(initialSubtitles);
    setCaptionText(initialSubtitles[0] || '');
  }, [initialImageUrls, initialSubtitles]);

  const handleIndexChange = (index: number) => {
    setSubtitles(prev =>
      prev.map((s, i) => (i === selectedIndex ? captionText : s)),
    );
    setSelectedIndex(index);
    setCaptionText(subtitles[index] || '');
  };

  const handleCaptionChange = (text: string) => {
    setCaptionText(text);
  };

  const handleRegenerateImage = async () => {
    try {
      setLoading(true);

      const result = await regenerateImage({
        text: captionText,
        number: selectedIndex + 1,
      });

      const updatedImages = [...imageUrls];
      updatedImages[selectedIndex] = result.image_url;
      setImageUrls(updatedImages);

      const updatedSubtitles = [...subtitles];
      updatedSubtitles[selectedIndex] = captionText;
      setSubtitles(updatedSubtitles);
    } catch (error) {
      console.error('❌ 이미지 재생성 실패:', error);
      Alert.alert('에러', '이미지 재생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    const updatedSubtitles = [...subtitles];
    updatedSubtitles[selectedIndex] = captionText;
    setSubtitles(updatedSubtitles);

    const imageFilenames = imageUrls.map(url => url.split('/').pop() || '');
    const isValidImages = imageFilenames.every(name => name !== '');
    const isValidSubtitles = updatedSubtitles.every(s => s.trim() !== '');

    if (!isValidImages || !isValidSubtitles) {
      Alert.alert('입력 오류', '모든 이미지와 자막을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      let videosToUse = existingVideos;

      if (!existingVideos || existingVideos.length === 0) {
        const response = await generatePartialVideo({
          images: imageFilenames,
          subtitles: updatedSubtitles,
        });
        videosToUse = response.video_urls;
      }

      navigation.navigate('FinalVideoScreen', {
        from: 'shorts',
        duration,
        prompt,
        imageUrls,
        subtitles: updatedSubtitles,
        videos: videosToUse,
        previewImage: imageUrls[0], // ✅ 첫 번째 이미지만 전달
      });
    } catch (error) {
      console.error('❌ 영상 생성 실패:', error);
      Alert.alert('에러', '영상 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
            <AnimatedProgressBar progress={3 / 5} />

      <ScrollView
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.imageNumberText}>{selectedIndex + 1}번 사진</Text>
        </View>

        <View style={styles.sliderWrapper}>
          <Swiper
            loop={false}
            showsButtons={false}
            showsPagination={false}
            onIndexChanged={handleIndexChange}
            containerStyle={styles.swiperContainer}>
            {imageUrls.map((uri, index) => (
              <View key={index} style={styles.imageBox}>
                {uri.startsWith('http') ? (
                  <Image
                    source={{uri}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={{color: 'red'}}>잘못된 이미지 URL</Text>
                )}
              </View>
            ))}
          </Swiper>
          <View style={styles.customPagination}>
            {imageUrls.map((_, index) => (
              <Text
                key={index}
                style={
                  index === selectedIndex
                    ? styles.progressDotActive
                    : styles.progressDotInactive
                }>
                ●
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.captionBox}>
          <TextInput
            style={styles.captionText}
            multiline
            numberOfLines={2}
            value={captionText}
            onChangeText={handleCaptionChange}
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.fixedButtonWrapper,
          {
            paddingBottom: insets.bottom,
            gap: 12,
            marginBottom: -30,
          },
        ]}>
        <CustomButton
          title="사진 재생성"
          onPress={handleRegenerateImage}
          type="gray"
          disabled={loading}
          style={{width: '45%', height: 42}}
        />
        <CustomButton
          title="영상 생성"
          onPress={handleGenerateVideo}
          type="gradient"
          style={{width: '45%', height: 42}}
        />
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>처리 중...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ImageSelectionScreen;
