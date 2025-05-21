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
  Modal,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from '../../styles/shorts/imageSelectionStyles';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import ProgressBar from '../../components/ProgressBar';
import {regenerateImage, generatePartialVideo} from '../../api/generateApi';
import {useGenerate} from '../../context/GenerateContext';
import {navigationRef} from '../../navigator/AppNavigator';

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

  const {setResult} = useGenerate();
  const [imageUrls, setImageUrls] = useState(initialImageUrls);
  const [subtitles, setSubtitles] = useState(initialSubtitles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [captionText, setCaptionText] = useState(initialSubtitles[0]);
  const [loading, setLoading] = useState(false);

  const handleIndexChange = (index: number) => {
    setSubtitles(prev =>
      prev.map((s, i) => (i === selectedIndex ? captionText : s)),
    );
    setSelectedIndex(index);
    setCaptionText(subtitles[index]);
  };

  const handleCaptionChange = (text: string) => setCaptionText(text);

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
        setResult({
          prompt,
          duration,
          imageUrls,
          subtitles: updatedSubtitles,
        });
        if (navigationRef.isReady()) {
          navigationRef.navigate('Main', {screen: 'Home'});
        }
      } else {
        const response = await generatePartialVideo({
          images: imageFilenames,
          subtitles: updatedSubtitles,
        });

        setResult({
          prompt,
          duration,
          imageUrls,
          subtitles: updatedSubtitles,
          videos: response.video_urls,
        });
        if (navigationRef.isReady()) {
          navigationRef.navigate('Main', {screen: 'Home'});
        }
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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.imageNumberText}>{selectedIndex + 1}번 사진</Text>
        <TouchableOpacity onPress={handleGenerateVideo}>
          <Text style={styles.navIcon}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarWrapper}>
        <ProgressBar currentStep={3} mode="shorts" />
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

      <View style={styles.captionBox}>
        <TextInput
          style={styles.captionText}
          multiline
          numberOfLines={2}
          value={captionText}
          onChangeText={handleCaptionChange}
        />
      </View>

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

      {loading && (
        <Modal transparent animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>생성 중입니다...</Text>
              <CustomButton
                title="앱 구경하기"
                onPress={() => {
                  setLoading(false);
                  if (navigationRef.isReady()) {
                    navigationRef.navigate('Main', {screen: 'Home'});
                  }
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default ImageSelectionScreen;
