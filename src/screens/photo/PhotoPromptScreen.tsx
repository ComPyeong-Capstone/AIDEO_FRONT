import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from '../../styles/photo/PhotoPromptStyles';
import {
  progressBarWrapperWithTop,
  fixedButtonWrapperWithPadding,
} from '../../styles/photo/PhotoPromptDynamicStyles';
import {COLORS} from '../../styles/colors';
import CustomButton from '../../styles/button';
import ProgressBar from '../../components/ProgressBar';
import {ImageItem} from '../../types/common';

import {StackNavigationProp} from '@react-navigation/stack';
import {PhotoStackParamList} from '../../navigator/PhotoNavigator';
import {generatePartialVideo} from '../../api/generateApi';

type PhotoPromptScreenNavigationProp = StackNavigationProp<
  PhotoStackParamList,
  'PhotoPromptScreen'
>;

interface Props {
  navigation: PhotoPromptScreenNavigationProp;
  route: any;
}

const PhotoPromptScreen: React.FC<Props> = ({navigation, route}) => {
  const {duration} = route.params;
  const maxCount = Math.floor(duration / 5);

  const [images, setImages] = useState<ImageItem[]>(
    Array.from({length: maxCount}, (_, i) => ({id: String(i), uri: null})),
  );

  const [subtitles, setSubtitles] = useState<string[]>(
    Array.from({length: maxCount}, () => ''),
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const swiperRef = useRef<Swiper>(null);

  const pickImage = (index: number) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 1,
        includeBase64: false,
      },
      response => {
        const uri = response.assets?.[0]?.uri ?? null;
        if (!response.didCancel && uri) {
          const updated = [...images];
          updated[index] = {id: String(index), uri};
          setImages(updated);
        }
      },
    );
  };

  const handleCaptionChange = (text: string) => {
    const updated = [...subtitles];
    updated[selectedIndex] = text;
    setSubtitles(updated);
  };

  const handleGeneratePartialVideos = async () => {
    const selectedImages = images.filter(img => img.uri !== null) as {
      id: string;
      uri: string;
    }[];

    const filledCaptions = subtitles.filter(s => s.trim() !== '');

    if (selectedImages.length < maxCount || filledCaptions.length < maxCount) {
      Alert.alert(
        '입력 오류',
        `${maxCount}장의 사진과 자막을 모두 입력해주세요.`,
      );
      return;
    }

    try {
      // ✅ 이미지 파일명만 추출
      const imageFilenames = images.map(img => {
        const segments = img.uri?.split('/');
        return segments ? segments[segments.length - 1] : '';
      });

      const response = await generatePartialVideo({
        images: imageFilenames,
        subtitles,
      });

      navigation.navigate('FinalVideoScreen', {
        from: 'photo',
        prompt: '',
        images: selectedImages,
        videos: response.video_urls,
        subtitles,
      });
    } catch (error) {
      console.error('부분 영상 생성 실패:', error);
      Alert.alert('에러', '부분 영상 생성에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={progressBarWrapperWithTop(insets.top)}>
        <ProgressBar currentStep={2} mode="photo" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              key={images.length}
              showsButtons={false}
              loop={false}
              activeDotColor={COLORS.primary}
              dotColor={COLORS.dotInactive}
              paginationStyle={styles.pagination}
              onIndexChanged={setSelectedIndex}>
              {images.map((item, index) => (
                <View key={item.id} style={styles.slide}>
                  {item.uri ? (
                    <Image
                      source={{uri: item.uri}}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => pickImage(index)}>
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </Swiper>
          </View>

          <View style={styles.paginationSpacing} />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.promptInput}
              placeholder={`자막 입력 (${selectedIndex + 1}/${maxCount})`}
              placeholderTextColor="#aaa"
              value={subtitles[selectedIndex]}
              onChangeText={handleCaptionChange}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      <View style={fixedButtonWrapperWithPadding(insets.bottom)}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
          style={styles.buttonSpacing}
        />
        <CustomButton
          title="영상 생성"
          onPress={handleGeneratePartialVideos}
          type="primary"
          style={styles.buttonSpacing}
        />
      </View>
    </SafeAreaView>
  );
};

export default PhotoPromptScreen;
