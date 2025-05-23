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

  useEffect(() => {
    console.log('📥 [ImageSelectionScreen] 전달받은 props');
    console.log('🖼️ imageUrls:', initialImageUrls);
    console.log('📝 subtitles:', initialSubtitles);
    console.log('⏱️ duration:', duration);
    console.log('💬 prompt:', prompt);
    console.log('🎞️ videos:', existingVideos);

    setImageUrls(initialImageUrls);
    setSubtitles(initialSubtitles);
    setCaptionText(initialSubtitles[0] || '');
  }, [initialImageUrls, initialSubtitles, duration, prompt, existingVideos]);

  const handleIndexChange = (index: number) => {
    console.log('➡️ Swiper 인덱스 변경:', index);

    // 현재 자막 저장
    setSubtitles(prev =>
      prev.map((s, i) => (i === selectedIndex ? captionText : s)),
    );

    // 다음 자막 로드
    setSelectedIndex(index);
    setCaptionText(subtitles[index] || '');
  };

  const handleCaptionChange = (text: string) => {
    setCaptionText(text);
  };

  const handleRegenerateImage = async () => {
    try {
      setLoading(true);
      console.log(
        `🔄 ${selectedIndex + 1}번 이미지 재생성 요청 (자막: ${captionText})`,
      );

      const result = await regenerateImage({
        text: captionText,
        number: selectedIndex + 1,
      });

      console.log('✅ 이미지 재생성 결과:', result.image_url);

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

    console.log('🎬 영상 생성 유효성 검사');
    console.log('✅ 이미지 파일명:', imageFilenames);
    console.log('✅ 자막 목록:', updatedSubtitles);

    if (!isValidImages || !isValidSubtitles) {
      Alert.alert('입력 오류', '모든 이미지와 자막을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      if (existingVideos && existingVideos.length > 0) {
        console.log('🟢 기존 영상 존재 → FinalVideoScreen 이동');
        navigation.navigate('FinalVideoScreen', {
          from: 'shorts',
          duration,
          prompt,
          imageUrls,
          subtitles: updatedSubtitles,
          videos: existingVideos,
        });
      } else {
        console.log('📡 부분 영상 생성 요청');
        const response = await generatePartialVideo({
          images: imageFilenames,
          subtitles: updatedSubtitles,
        });

        console.log('🎥 부분 영상 생성 완료:', response.video_urls);

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
      console.error('❌ 영상 생성 실패:', error);
      Alert.alert('에러', '부분 영상 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.imageNumberText}>{selectedIndex + 1}번 사진</Text>
        </View>
     <AnimatedProgressBar progress={3 / 5} />

        <View style={styles.sliderWrapper}>
          <Swiper
            loop={false}
            showsButtons={false}
            showsPagination={false}
            onIndexChanged={handleIndexChange}
            containerStyle={styles.swiperContainer}>
            {imageUrls.map((uri, index) => (
              <View key={index} style={styles.imageBox}>
                <Image
                  source={{uri}}
                  style={styles.image}
                  resizeMode="contain"
                  onError={e => {
                    console.error(
                      `🛑 이미지 로딩 실패 (index: ${index})`,
                      e.nativeEvent,
                    );
                  }}
                  onLoad={() => {
                    console.log(`✅ 이미지 로딩 성공 (index: ${index})`);
                  }}
                />
              </View>
            ))}
          </Swiper>

    /*       <View style={styles.customPagination}>
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
          </View> */
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
