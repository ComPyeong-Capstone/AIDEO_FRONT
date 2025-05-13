import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from '../../styles/photo/PhotoPromptStyles';
import {COLORS} from '../../styles/colors';
import CustomButton from '../../styles/button';
import ProgressBar from '../../components/ProgressBar';
import {ImageItem} from '../../types/common';

import {StackNavigationProp} from '@react-navigation/stack';
import {PhotoStackParamList} from '../../navigator/PhotoNavigator';

type PhotoPromptScreenNavigationProp = StackNavigationProp<
  PhotoStackParamList,
  'PhotoPromptScreen'
>;

interface Props {
  navigation: PhotoPromptScreenNavigationProp;
}

const PhotoPromptScreen: React.FC<Props> = ({navigation}) => {
  const [images, setImages] = useState<ImageItem[]>([{id: 'add', uri: null}]);
  const [prompt, setPrompt] = useState('');
  const insets = useSafeAreaInsets();
  const swiperRef = useRef<Swiper>(null);

  const pickImage = () => {
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
          const newImages = [
            ...images.filter(img => img.id !== 'add'),
            {id: String(Date.now()), uri},
            {id: 'add', uri: null},
          ];
          setImages(newImages);

          // ✅ 마지막 슬라이드로 이동
          setTimeout(() => {
            swiperRef.current?.scrollBy(newImages.length - images.length, true);
          }, 100);
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행바 */}
      <View style={[styles.progressBarWrapper, {top: insets.top + 10}]}>
        <ProgressBar currentStep={2} mode="photo" />
      </View>

      {/* ✅ 본문 */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          {/* ✅ 이미지 선택 */}
          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              key={images.length}
              showsButtons={false}
              loop={false}
              activeDotColor={COLORS.primary}
              dotColor={COLORS.dotInactive}
              paginationStyle={styles.pagination}>
              {images.map(item => (
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
                      onPress={pickImage}>
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </Swiper>
          </View>

          {/* ✅ 페이지네이션 아래 여백 */}
          <View style={styles.paginationSpacing} />

          {/* ✅ 프롬프트 입력 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.promptInput}
              placeholder="프롬프트를 입력하세요"
              placeholderTextColor="#aaa"
              value={prompt}
              onChangeText={setPrompt}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      {/* ✅ 하단 버튼 */}
      <View style={[styles.fixedButtonWrapper, {paddingBottom: insets.bottom}]}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
          style={styles.buttonSpacing}
        />
        <CustomButton
          title="영상 생성"
          onPress={() =>
            navigation.navigate('FinalVideoScreen', {
              prompt,
              images: images.filter(img => img.uri !== null),
            })
          }
          type="primary"
          style={styles.buttonSpacing}
        />
      </View>
    </SafeAreaView>
  );
};

export default PhotoPromptScreen;
