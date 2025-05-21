import React, {useRef, useState, useEffect} from 'react';
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
import {generatePartialVideoWithUpload} from '../../api/generateApi';
import {navigationRef} from '../../navigator/AppNavigator';

let completeModalTimer: NodeJS.Timeout | null = null;

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
  const [videoData, setVideoData] = useState<{
    files: any[];
    videos: string[];
  } | null>(null);
  const [completedInBackground, setCompletedInBackground] = useState(false);

  const insets = useSafeAreaInsets();
  const swiperRef = useRef<Swiper>(null);

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
        const name =
          img.name || img.uri.split('/').pop() || `image_${img.id}.jpg`;
        const type = name.endsWith('.png')
          ? 'image/png'
          : name.endsWith('.jpg') || name.endsWith('.jpeg')
          ? 'image/jpeg'
          : 'application/octet-stream';

        return {
          uri: img.uri,
          name,
          type,
        };
      });

      const response = await generatePartialVideoWithUpload(files, subtitles);

      setVideoData({files, videos: response.video_urls});

      if (!navigation.isFocused() && navigationRef.isReady()) {
        setCompletedInBackground(true); // 백그라운드에서 완료됨
      } else {
        setShowCompleteModal(true);
      }
    } catch (error) {
      console.error('❌ 부분 영상 생성 실패:', error);
      Alert.alert('에러', '부분 영상 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const goToFinalVideo = () => {
    if (!videoData) return;
    setShowCompleteModal(false);
    if (completeModalTimer) clearTimeout(completeModalTimer);
    navigation.navigate('FinalVideoScreen', {
      from: 'photo',
      prompt: '',
      images,
      videos: videoData.videos,
      subtitles,
      files: videoData.files,
    });
  };

  useEffect(() => {
    // 포커스로 돌아왔을 때 자동 알림 모달 표시
    const unsubscribe = navigation.addListener('focus', () => {
      if (completedInBackground && videoData) {
        completeModalTimer = setTimeout(() => {
          setShowCompleteModal(true);
          setCompletedInBackground(false);
        }, 300); // 약간의 딜레이 후 모달 표시
      }
    });

    return () => {
      if (completeModalTimer) clearTimeout(completeModalTimer);
      unsubscribe();
    };
  }, [completedInBackground, videoData, navigation]);

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
          disabled={loading}
        />
      </View>

      {/* 로딩 인디케이터 */}
      {loading && (
        <Modal transparent animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>영상 생성 중입니다...</Text>
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

      {/* 완료 모달 */}
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
