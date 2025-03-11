import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styles} from '../../styles/shorts/imageSelectionStyles'; // ✅ 스타일 분리
import {scaleSize, scaleFont} from '../../styles/responsive'; // ✅ 반응형 크기 조정 함수 가져오기

// ✅ 네비게이션 타입 정의
type RootStackParamList = {
  ImageSelectionScreen: undefined;
  FinalVideoScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ImageSelectionScreen'>;

const ImageSelectionScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets(); // ✅ 노치 대응

  // 📌 더미 데이터 (사진 목록)
  const images = ['사진', '사진', '사진', '사진 2', '사진 3'];
  const [selectedImage, setSelectedImage] = useState<number>(2); // 기본 선택 (중앙)
  const translateX = new Animated.Value(0);

  const handleNext = () => {
    if (selectedImage < images.length - 1) {
      Animated.timing(translateX, {
        toValue: -scaleSize(400 * (selectedImage + 1)), // ✅ 반응형 적용
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedImage(selectedImage + 1));
    }
  };

  const handlePrev = () => {
    if (selectedImage > 0) {
      Animated.timing(translateX, {
        toValue: -scaleSize(400 * (selectedImage - 1)), // ✅ 반응형 적용
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedImage(selectedImage - 1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 최상단 4단계 진행바 (노치 대응) */}
      <View
        style={[styles.progressContainer, {top: insets.top + scaleSize(40)}]}>
        <Text style={[styles.progressDotInactive, {fontSize: scaleFont(18)}]}>
          ○
        </Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, {fontSize: scaleFont(18)}]}>
          ○
        </Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotActive, {fontSize: scaleFont(18)}]}>
          ●
        </Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, {fontSize: scaleFont(18)}]}>
          ○
        </Text>
      </View>

      {/* 📌 사진 선택 슬라이드 */}
      <View style={styles.sliderContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Animated.View style={[styles.imageItem, {transform: [{translateX}]}]}>
          <Text style={styles.imageText}>{images[selectedImage]}</Text>
        </Animated.View>
        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 선택된 이미지의 자막 표시 */}
      <View style={styles.captionBox}>
        <Text style={styles.captionText}>생성된 자막</Text>
      </View>

      {/* 📌 버튼 추가 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={() => navigation.navigate('FinalVideoScreen')}>
          <Text style={styles.buttonText}>영상 생성</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ImageSelectionScreen;
