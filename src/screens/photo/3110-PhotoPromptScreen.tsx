import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.8;
const IMAGE_HEIGHT = IMAGE_WIDTH * (9 / 16); // 16:9 비율 적용
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

const PhotoPromptScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [images, setImages] = useState([
    { id: 'add', uri: null }, // 첫 번째 슬라이드는 항상 + 버튼
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

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


const renderItem = ({ item }) => (
  <View style={styles.slide}>
    {item.uri ? (
      <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
    ) : (
      <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    )}
  </View>
);


  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 이미지 슬라이더 */}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: width, // 각 아이템의 길이를 고정
          offset: width * index, // 각 아이템의 위치를 고정
          index,
        })}
        initialScrollIndex={images.length - 1} // 새 이미지 추가 시 마지막으로 이동
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
      />

      {/* ✅ 페이지 인디케이터 */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.dotActive : styles.dotInactive
            ]}
          />
        ))}
      </View>

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
  slide: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: width * 0.05, // 가운데 정렬
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
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
  pagination: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#00A6FB',
    width: 12,
    height: 12,
  },
  dotInactive: {
    backgroundColor: '#415A77',
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
