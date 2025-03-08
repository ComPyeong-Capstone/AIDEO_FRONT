import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const ImageSelectionScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets(); // ✅ 노치 대응

  // 📌 더미 데이터 (사진 목록)
  const images = ['사진', '사진', '사진', '사진 2', '사진 3'];
  const [selectedImage, setSelectedImage] = useState(2); // 기본 선택 (중앙)
  const translateX = new Animated.Value(0);

  const handleNext = () => {
    if (selectedImage < images.length - 1) {
      Animated.timing(translateX, {
        toValue: -width * (selectedImage + 1),
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedImage(selectedImage + 1));
    }
  };

  const handlePrev = () => {
    if (selectedImage > 0) {
      Animated.timing(translateX, {
        toValue: -width * (selectedImage - 1),
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedImage(selectedImage - 1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 최상단 4단계 진행바 (노치 대응) */}
      <View
        style={[
          styles.progressContainer,
          {top: insets.top + scaleSize(40, height)},
        ]}>
        <Text
          style={[
            styles.progressDotInactive,
            {fontSize: scaleFont(18, width)},
          ]}>
          ○
        </Text>
        <View style={styles.progressLine} />
        <Text
          style={[
            styles.progressDotInactive,
            {fontSize: scaleFont(18, width)},
          ]}>
          ○
        </Text>
        <View style={styles.progressLine} />
        <Text
          style={[styles.progressDotActive, {fontSize: scaleFont(18, width)}]}>
          ●
        </Text>
        <View style={styles.progressLine} />
        <Text
          style={[
            styles.progressDotInactive,
            {fontSize: scaleFont(18, width)},
          ]}>
          ○
        </Text>
      </View>

      {/* 📌 사진 선택 슬라이드 (한 장씩 넘기는 애니메이션 방식) */}
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
          style={[styles.button, styles.prevButton, {width: '45%'}]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.nextButton, {width: '45%'}]}
          onPress={() => navigation.navigate('FinalVideoScreen')}>
          <Text style={styles.buttonText}>영상 생성</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// 📌 **스타일 정의 (반응형 적용)**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: '10%',
  },
  progressLine: {
    height: 2,
    backgroundColor: '#51BCB4',
    flex: 1,
    marginHorizontal: '2%',
  },
  progressDotActive: {
    color: '#51BCB4',
  },
  progressDotInactive: {
    color: '#888',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(80, 375),
  },
  imageItem: {
    width: 200,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#51BCB4',
  },
  imageText: {
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
  arrowButton: {
    padding: 20,
  },
  arrowText: {
    fontSize: 24,
    color: '#51BCB4',
  },
  captionBox: {
    width: '90%',
    height: 50,
    borderColor: '#51BCB4',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 30,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  prevButton: {
    backgroundColor: '#ccc',
  },
  nextButton: {
    backgroundColor: '#51BCB4',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
});

export default ImageSelectionScreen;
