import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.6;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

const images = [
  { id: '1', text: '사진 1' },
  { id: '2', text: '사진 2' },
  { id: '3', text: '사진 3' },
  { id: '4', text: '사진 4' },
];

const PhotoPromptScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // ✅ 개별 슬라이드 애니메이션 적용
  const renderItem = ({ item, index }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.slide,
          { transform: [{ scale }], opacity }
        ]}
      >
        <Text style={styles.imageText}>{item.text}</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 슬라이더 */}
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={IMAGE_WIDTH}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.6}
        enableMomentum
        onSnapToItem={(index) => {
          scrollX.setValue(index);
          setActiveIndex(index);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
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
    backgroundColor: '#0D1B2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: '#1B263B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  imageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E1DD',
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
