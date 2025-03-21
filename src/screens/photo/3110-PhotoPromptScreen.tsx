import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.7; // 살짝 보이도록 크기 줄이기
const IMAGE_HEIGHT = IMAGE_WIDTH * (9 / 16); // 16:9 비율 적용
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

const PhotoPromptScreen = ({ navigation }) => {
  const [images, setImages] = useState([
    { id: 'add', uri: null }, // 첫 번째 슬라이드는 항상 + 버튼
  ]);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 1,
      includeBase64: false,
      aspect: [9, 16], // 📌 업로드 시 강제 크롭
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setImages((prevImages) => [
          ...prevImages.filter(img => img.id !== 'add'),
          { id: String(Date.now()), uri: response.assets[0].uri },
          { id: 'add', uri: null }, // 마지막에는 항상 + 버튼 유지
        ]);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Swiper 이미지 슬라이더 */}
  <Swiper
    key={images.length} // ✅ Swiper 재생성을 유도
    style={styles.wrapper}
    showsButtons={false}
    loop={false}
    activeDotColor="#00A6FB"
    dotColor="#D9D9D9"
    paginationStyle={{ bottom: -20 }}
    containerStyle={{ width: width, alignSelf: 'center' }}
  >
    {images.map((item) => (
      <View key={item.id} style={[styles.slide]}>
        {item.uri ? (
          <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    ))}
  </Swiper>

      {/* ✅ 버튼 컨트롤 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FinalVideoScreen')}
        >
          <Text style={styles.buttonText}>영상 생성</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhotoPromptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {},
slide: {
  width: IMAGE_WIDTH,
  height: IMAGE_HEIGHT,
  borderRadius: 10,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: COLORS.imagebox,
  marginHorizontal: (width - IMAGE_WIDTH) / 2, // 가운데 정렬 + 양옆 이미지 살짝 보이게
},

  image: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00A6FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#00A6FB',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
