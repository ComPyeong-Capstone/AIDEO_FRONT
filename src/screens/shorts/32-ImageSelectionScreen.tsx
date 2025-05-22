import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TextInput,
  Modal,
  PanResponder,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from '../../styles/shorts/imageSelectionStyles';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import ProgressBar from '../../components/ProgressBar';
import {regenerateImage, generatePartialVideo} from '../../api/generateApi';
import {useGenerate} from '../../context/GenerateContext';

type Props = NativeStackScreenProps<
  ShortsStackParamList,
  'ImageSelectionScreen'
>;

const MAX_CHAR = 45;

const ImageSelectionScreen: React.FC<Props> = ({navigation, route}) => {
  const {
    imageUrls: initialImageUrls,
    subtitles: initialSubtitles,
    duration,
    prompt,
    videos: existingVideos,
  } = route.params;

  const {setResult} = useGenerate();
  const [imageUrls, setImageUrls] = useState(initialImageUrls);
  const [subtitles, setSubtitles] = useState(initialSubtitles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [captionText, setCaptionText] = useState(initialSubtitles[0]);
  const [loading, setLoading] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          navigation.navigate('PromptInputScreen', {duration});
        }
      },
    }),
  ).current;

  const handleIndexChange = (index: number) => {
    setSubtitles(prev =>
      prev.map((s, i) => (i === selectedIndex ? captionText : s)),
    );
    setSelectedIndex(index);
    setCaptionText(subtitles[index]);
  };

  const handleCaptionChange = (text: string) => {
    if (text.length <= MAX_CHAR) setCaptionText(text);
  };

  const handleRegenerateImage = async () => {
    try {
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
      console.log('이미지 재생성 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    const updatedSubtitles = [...subtitles];
    updatedSubtitles[selectedIndex] = captionText;
    setSubtitles(updatedSubtitles);

    const imageFilenames = imageUrls.map(url => url.split('/').pop() || '');
    const isValid =
      imageFilenames.every(n => n !== '') &&
      updatedSubtitles.every(s => s.trim() !== '');
    if (!isValid) return;

    try {
      setLoading(true);

      if (existingVideos && existingVideos.length > 0) {
        setResult({prompt, duration, imageUrls, subtitles: updatedSubtitles});
        navigation.navigate('Main', {screen: 'Home'});
      } else {
        const res = await generatePartialVideo({
          images: imageFilenames,
          subtitles: updatedSubtitles,
        });
        setResult({
          prompt,
          duration,
          imageUrls,
          subtitles: updatedSubtitles,
          videos: res.video_urls,
        });
        navigation.navigate('Main', {screen: 'Home'});
      }
    } catch (e) {
      console.log('영상 생성 실패:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container} {...panResponder.panHandlers}>
        {/* 진행바 */}
        <View style={styles.progressBarWrapper}>
          <ProgressBar currentStep={3} mode="shorts" />
        </View>

        {/* 이미지 번호 */}
        <View style={styles.headerContainer}>
          <Text style={styles.imageNumberText}>{selectedIndex + 1}번 사진</Text>
        </View>

        {/* 이미지 스와이퍼 */}
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

        {/* 자막 입력창 */}
        <View style={styles.captionBox}>
          <TextInput
            style={styles.captionText}
            multiline
            numberOfLines={2}
            value={captionText}
            onChangeText={handleCaptionChange}
            placeholder="자막을 입력하세요 (최대 45자)"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.captionCount}>
            {captionText.length} / {MAX_CHAR}
          </Text>
        </View>

        {/* 하단 고정 버튼 */}
        <View style={styles.fixedBottom}>
          <CustomButton
            title="사진 재생성"
            onPress={handleRegenerateImage}
            type="secondary"
            style={styles.buttonSpacing}
            disabled={loading}
          />
          <CustomButton
            title="영상 생성"
            onPress={handleGenerateVideo}
            type="primary"
            style={styles.buttonSpacing}
            disabled={loading}
          />
        </View>

        {/* 로딩 */}
        {loading && (
          <Modal transparent animationType="fade">
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>생성 중입니다...</Text>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ImageSelectionScreen;
