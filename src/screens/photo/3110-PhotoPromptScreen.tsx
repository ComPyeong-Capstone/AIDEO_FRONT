import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  MediaType,
} from 'react-native-image-picker';

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

  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      const uri = response.assets?.[0]?.uri ?? null;
      if (!response.didCancel && uri) {
        setImages(prevImages => [
          ...prevImages.filter(img => img.id !== 'add'),
          {id: String(Date.now()), uri},
          {id: 'add', uri: null},
        ]);
      }
    });
  };

  return (
    <>
      {/* ✅ 진행바 SafeAreaView 밖에 위치 */}
      <ProgressBar currentStep={1} mode="photo" />

      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          <Swiper
            key={images.length}
            style={styles.wrapper}
            showsButtons={false}
            loop={false}
            activeDotColor={COLORS.primary}
            dotColor={COLORS.dotInactive}
            paginationStyle={styles.pagination}
            containerStyle={styles.swiperContainer}>
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

          <TextInput
            style={styles.promptInput}
            placeholder="프롬프트를 입력하세요"
            placeholderTextColor="#aaa"
            value={prompt}
            onChangeText={setPrompt}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              title="이전"
              onPress={() => navigation.goBack()}
              type="secondary"
              style={styles.buttonSpacing}
            />
            <CustomButton
              title="영상 생성"
              onPress={() => navigation.navigate('FinalVideoScreen')}
              type="primary"
              style={styles.buttonSpacing}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PhotoPromptScreen;
