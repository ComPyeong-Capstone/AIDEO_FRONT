// ✅ 모든 import 동일
import React, {useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAvoidingView, Platform} from 'react-native'; // 추가

import styles from '../../styles/photo/PhotoPromptStyles';
import {
  progressBarWrapperWithTop,
  fixedButtonWrapperWithPadding,
} from '../../styles/photo/PhotoPromptDynamicStyles';
import {COLORS} from '../../styles/colors';
import CustomButton from '../../styles/button';
import {ImageItem} from '../../types/common';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import ProgressBar from '../../components/ProgressBar';

import {StackNavigationProp} from '@react-navigation/stack';
import {PhotoStackParamList} from '../../navigator/PhotoNavigator';
import {generatePartialVideoWithUpload} from '../../api/generateApi';
import {navigationRef} from '../../navigator/AppNavigator';

import {useFocusEffect} from '@react-navigation/native';
import {useVideoGeneration} from '../../context/VideoGenerationContext';

const {width} = Dimensions.get('window');

type PhotoPromptScreenNavigationProp = StackNavigationProp<
  PhotoStackParamList,
  'PhotoPromptScreen'
>;

interface Props {
  navigation: PhotoPromptScreenNavigationProp;
  route: {
    params: {
      duration: number;
    };
  };
}

const PhotoPromptScreen: React.FC<Props> = ({navigation, route}) => {
  const {duration} = route.params;
  const maxCount = Math.floor(duration / 5);

  const [images, setImages] = useState<ImageItem[]>([
    {id: '0', uri: null, name: ''},
  ]);
  const [subtitles, setSubtitles] = useState<string[]>(['']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [generated, setGenerated] = useState(false);

  const insets = useSafeAreaInsets();
  const swiperRef = useRef<Swiper>(null);

  const {notifyReady, isReady, videoData, resetStatus} = useVideoGeneration();

  const pickImage = (index: number) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 1,
      },
      response => {
        const asset = response.assets?.[0];
        const uri = asset?.uri ?? null;
        const name = asset?.fileName ?? asset?.uri?.split('/').pop() ?? '';

        if (!response.didCancel && uri) {
          const updated = [...images];
          updated[index] = {id: String(index), uri, name};
          setImages(updated);

          if (images.length < maxCount && index === images.length - 1) {
            setImages(prev => [
              ...prev,
              {id: String(prev.length), uri: null, name: ''},
            ]);
            setSubtitles(prev => [...prev, '']);
          }
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
    if (generated && videoData?.videos?.length === maxCount) {
      console.log('⚡ 이미 생성된 영상이 있으므로 API 재호출 없이 이동합니다.');
      navigation.navigate('FinalVideoScreen', videoData);
      return;
    }

    const selectedImages = images.filter(img => img.uri !== null) as {
      id: string;
      uri: string;
      name?: string;
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
      setLoading(true);

      const files = selectedImages.map(img => {
        const originalName = img.name || img.uri.split('/').pop() || '';
        const name = originalName || `image_${img.id}.jpg`;
        const type = name.endsWith('.png')
          ? 'image/png'
          : name.endsWith('.jpg') || name.endsWith('.jpeg')
          ? 'image/jpeg'
          : 'application/octet-stream';

        console.log(
          `📁 이미지 ${img.id}: 원본 파일명: ${originalName}, 최종 저장명: ${name}`,
        );

        return {uri: img.uri, name, type};
      });

      const response = await generatePartialVideoWithUpload(files, subtitles);
      setLoading(false);

      console.log('🎞️ 영상 URL들:', response.video_urls);

      notifyReady({
        from: 'photo',
        prompt: '',
        images,
        subtitles,
        videos: response.video_urls,
        imageUrls: response.image_urls, // ✅ 추가
        files,
        previewImage: response.image_urls[0] || '', // ✅ 수정
        previewSubtitle: subtitles[0] || '',
      });

      setGenerated(true);
    } catch (error) {
      console.error('❌ 부분 영상 생성 실패:', error);
      Alert.alert('에러', '부분 영상 생성에 실패했습니다.');
      setLoading(false);
    }
  };

  console.log('🚀 videoData:', videoData);

  const goToFinalVideo = () => {
    if (!videoData) return;
    setShowCompleteModal(false);
    resetStatus();
    navigation.navigate('FinalVideoScreen', videoData);
  };

  useFocusEffect(
    useCallback(() => {
      if (isReady && videoData?.from === 'photo' && generated) {
        setTimeout(() => setShowCompleteModal(true), 300);
      }
    }, [isReady, videoData, generated]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        <AnimatedProgressBar progress={2 / 5} />

        <ScrollView
          contentContainerStyle={[styles.scrollContent, {paddingBottom: 40}]} // 👈 padding 추가
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.contentWrapper}>
            <View style={styles.swiperContainer}>
              <Swiper
                ref={swiperRef}
                key={images.length}
                horizontal
                scrollEnabled
                loop={false}
                showsButtons={false}
                activeDotColor={COLORS.primary}
                dotColor={COLORS.dotInactive}
                paginationStyle={styles.pagination}
                onIndexChanged={setSelectedIndex}>
                {images.map((item, index) => (
                  <View key={item.id} style={[styles.slide, {width}]}>
                    {/* ✅ swiper slide width 지정 */}
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
      </KeyboardAvoidingView>

      <View
        style={[
          styles.fixedButtonWrapper,
          {
            paddingBottom: insets.bottom,
            gap: 12,
            marginBottom: 0,
            justifyContent: 'center',
          },
        ]}>
        <CustomButton
          title="사진 변경"
          onPress={() => pickImage(selectedIndex)}
          type="gray"
          style={{flex: 1, width: '45%', height: 42}}
        />
        <CustomButton
          title="영상 생성"
          onPress={handleGeneratePartialVideos}
          type="gradient"
          style={{flex: 1, width: '45%', height: 42}}
          disabled={loading}
        />
      </View>

      {loading && (
        <Modal transparent animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>영상 생성 중입니다...</Text>
              <CustomButton
                title="앱 구경하기"
                onPress={() => {
                  setTimeout(() => {
                    if (navigationRef.isReady()) {
                      navigationRef.navigate('Main', {screen: 'Home'});
                    }
                  }, 200);
                }}
              />
            </View>
          </View>
        </Modal>
      )}

      {showCompleteModal && (
        <Modal transparent animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <Text style={styles.loadingText}>✅ 영상 생성 완료!</Text>
              <CustomButton title="확인" onPress={goToFinalVideo} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default PhotoPromptScreen;
