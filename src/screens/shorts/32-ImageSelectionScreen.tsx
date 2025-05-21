import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from '../../styles/shorts/imageSelectionStyles';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import ProgressBar from '../../components/ProgressBar';
import {regenerateImage, generatePartialVideo} from '../../api/generateApi';

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
  } = route.params;

  const [imageUrls, setImageUrls] = useState(initialImageUrls);
  const [subtitles, setSubtitles] = useState(initialSubtitles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [captionText, setCaptionText] = useState(initialSubtitles[0]);
  const [loading, setLoading] = useState(false);

  const handleIndexChange = (index: number) => {
    // 현재 슬라이드 자막 저장
    setSubtitles(prev =>
      prev.map((s, i) => (i === selectedIndex ? captionText : s)),
    );
    setSelectedIndex(index);
    setCaptionText(subtitles[index]);
  };

  const handleCaptionChange = (text: string) => setCaptionText(text);

  const handleRegenerateImage = async () => {
    try {
      // 최신 자막 먼저 저장
      const updatedSubtitles = [...subtitles];
      updatedSubtitles[selectedIndex] = captionText;
      setSubtitles(updatedSubtitles);

      setLoading(true);

      const result = await regenerateImage({
        text: captionText,
        number: selectedIndex + 1,
      });

      const updatedImages = [...imageUrls];
      updatedImages[selectedIndex] = result.image_url;
      setImageUrls(updatedImages);
    } catch {
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

      if (existingVideos && existingVideos.length > 0) {
        navigation.navigate('FinalVideoScreen', {
          from: 'shorts',
          duration,
          prompt,
          imageUrls,
          subtitles: updatedSubtitles,
          videos: existingVideos,
        });
      } else {
        const response = await generatePartialVideo({
          images: imageFilenames,
          subtitles: updatedSubtitles,
        });

        navigation.navigate('FinalVideoScreen', {
          from: 'shorts',
          duration,
          prompt,
          imageUrls,
          subtitles: updatedSubtitles,
          videos: response.video_urls,
        });
      }
    } catch (error) {
      console.error('영상 생성 실패:', error);
      Alert.alert('에러', '부분 영상 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.imageNumberText}>{selectedIndex + 1}번 사진</Text>
        <TouchableOpacity onPress={handleGenerateVideo}>
          <Text style={styles.navIcon}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 진행 바 */}
      <View style={styles.progressBarWrapper}>
        <ProgressBar currentStep={3} mode="shorts" />
      </View>

      {/* 이미지 슬라이더 */}
      <View style={styles.sliderWrapper}>
        <Swiper
          loop={false}
          showsButtons={false}
          showsPagination={false}
          onIndexChanged={handleIndexChange}
          containerStyle={styles.swiperContainer}>
          {imageUrls.map((uri, index) => (
            <View key={index} style={styles.imageBox}>
              <Image source={{uri}} style={styles.image} resizeMode="cover" />
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

      {/* 자막 입력 */}
      <View style={styles.captionBox}>
        <TextInput
          style={styles.captionText}
          multiline
          numberOfLines={2}
          value={captionText}
          onChangeText={handleCaptionChange}
        />
      </View>

      {/* 버튼 */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="사진 재생성"
          onPress={handleRegenerateImage}
          type="secondary"
          disabled={loading}
          style={styles.buttonSpacing}
        />
        <CustomButton
          title="영상 생성"
          onPress={handleGenerateVideo}
          type="primary"
          style={styles.buttonSpacing}
        />
      </View>

      {/* 로딩 오버레이 */}
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
