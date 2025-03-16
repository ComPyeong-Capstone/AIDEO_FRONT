import React, {useState, useRef} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
   FlatList,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {PhotoStackParamList} from '../../navigator/PhotoNavigator';
import styles from '../../styles/photo/PhotoPromptStyles';
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

// ✅ 네비게이션 타입 정의
type PhotoPromptScreenNavigationProp = StackNavigationProp<
  PhotoStackParamList,
  'PhotoPromptScreen'
>;

interface Props {
  navigation: PhotoPromptScreenNavigationProp;
}
const { width } = Dimensions.get('window');

const images = [
  { id: '1', text: '사진 1' },
  { id: '2', text: '사진 2' },
  { id: '3', text: '사진 3' },
  { id: '4', text: '사진 4' },
];
const PhotoPromptScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
const IMAGE_WIDTH = width * 0.7; // 화면 너비의 70%
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9); // 9:16 비율 적용

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
          styles.imageItem,
          { transform: [{ scale }], opacity },
        ]}
      >
        <Text style={styles.imageText}>{item.text}</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행 바 */}
      <View style={styles.progressContainer}>
        {['○ ', ' ○ ', ' ● ', ' ○ '].map((dot, index) => (
          <React.Fragment key={index}>
            <Text style={index === 2 ? styles.progressDotActive : styles.progressDotInactive}>
              {dot}
            </Text>
            {index < 3 && <View style={styles.progressLine} />}
          </React.Fragment>
        ))}
      </View>

      {/* ✅ 애니메이션 슬라이더 */}
      <View style={styles.sliderWrapper}>
   <FlatList
     ref={flatListRef}
     data={images}
     keyExtractor={(item) => item.id}
     horizontal
     pagingEnabled
     snapToAlignment="center" // ✅ 가운데 정렬 강제
     decelerationRate="fast" // ✅ 더 자연스럽게 스크롤
     showsHorizontalScrollIndicator={false}
     renderItem={renderItem}
     onScroll={Animated.event(
       [{ nativeEvent: { contentOffset: { x: scrollX } } }],
       { useNativeDriver: false }
     )}
   />

      </View>

      {/* ✅ 선택된 이미지의 자막 표시 */}
      <View style={styles.captionBox}>
        <Text style={styles.captionText}>생성된 자막</Text>
      </View>

      {/* ✅ 버튼 추가 */}
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
