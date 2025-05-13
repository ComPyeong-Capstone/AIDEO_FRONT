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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Entypo';

import {styles} from '../../styles/shorts/imageSelectionStyles';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import ProgressBar from '../../components/ProgressBar';
import {regenerateImage} from '../../api/generateApi';

type Props = NativeStackScreenProps<
  ShortsStackParamList,
  'ImageSelectionScreen'
>;

const ImageSelectionScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {
    imageUrls: initialImageUrls,
    subtitles: initialSubtitles,
    duration,
    prompt,
  } = route.params;

  const [imageUrls, setImageUrls] = useState(initialImageUrls);
  const [subtitles, setSubtitles] = useState(initialSubtitles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [captionText, setCaptionText] = useState(initialSubtitles[0]);
  const [loading, setLoading] = useState(false);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
    setCaptionText(subtitles[index]);
  };

  const handleCaptionChange = (text: string) => {
    setCaptionText(text);
  };

  const handleRegenerateImage = async () => {
    try {
      setLoading(true);

      // ✅ 자막 상태에 반영
      const updatedSubtitles = [...subtitles];
      updatedSubtitles[selectedIndex] = captionText;
      setSubtitles(updatedSubtitles);

      // ✅ 이미지 재생성 요청
      const result = await regenerateImage({
        text: captionText,
        number: selectedIndex + 1,
      });

      const updatedImages = [...imageUrls];
      updatedImages[selectedIndex] = result.image_url;
      setImageUrls(updatedImages);
    } catch (error) {
      console.error('이미지 재생성 실패:', error);
      Alert.alert('에러', '이미지 재생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 뒤로가기 */}
      <TouchableOpacity
        style={[styles.backButton, {top: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={28} color="#333" />
      </TouchableOpacity>

      {/* ✅ 진행바 */}
      <View style={styles.progressBarWrapper}>
        <ProgressBar currentStep={3} mode="shorts" />
      </View>

      {/* ✅ 이미지 슬라이더 */}
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

        {/* ✅ 커스텀 페이지네이션 */}
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

      {/* ✅ 자막 입력창 */}
      <View style={styles.captionBox}>
        <TextInput
          style={styles.captionText}
          multiline
          numberOfLines={2}
          value={captionText}
          onChangeText={handleCaptionChange}
        />
      </View>

      {/* ✅ 하단 버튼 */}
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
          onPress={() =>
            navigation.navigate('FinalVideoScreen', {
              from: 'shorts',
              duration,
              prompt,
              imageUrls,
              subtitles: subtitles.map((s, i) =>
                i === selectedIndex ? captionText : s,
              ),
            })
          }
          type="primary"
          style={styles.buttonSpacing}
        />
      </View>

      {/* ✅ 로딩 오버레이 */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>이미지 생성 중...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ImageSelectionScreen;
