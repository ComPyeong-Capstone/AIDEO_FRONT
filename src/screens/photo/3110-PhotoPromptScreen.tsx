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

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.8;
const IMAGE_HEIGHT = IMAGE_WIDTH * (9 / 16); // 16:9 비율 적용
import { COLORS } from '../../styles/colors'; // 🎨 색상 파일 가져오기

const images = [
  { id: '1', uri: require('../../assets/images/photo1.jpeg') },
  { id: '2', uri: require('../../assets/images/photo2.jpeg') },
  { id: '3', uri: require('../../assets/images/photo1.jpeg') },
  { id: '4', uri: require('../../assets/images/photo2.jpeg') },
];

const PhotoPromptScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      {/* ✅ 수정된 부분 */}
      <Image source={item.uri} style={styles.image} />
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
  },
  image: {
    width: '100%',
    height: '100%',
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
