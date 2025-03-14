import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
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

const PhotoPromptScreen: React.FC<Props> = ({navigation}) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets(); // ✅ 노치 대응

  // ✅ 더미 데이터 (사진 목록)
  const images = ['사진', '사진', '사진', '사진 2', '사진 3'];
  const [selectedImage, setSelectedImage] = useState<number>(2); // 기본 선택 (중앙)
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
      <View style={[styles.progressContainer, {top: insets.top + 40}]}>
        {['○', '○', '●', '○'].map((dot, index) => (
          <React.Fragment key={index}>
            <Text
              style={
                index === 2
                  ? styles.progressDotActive
                  : styles.progressDotInactive
              }>
              {dot}
            </Text>
            {index < 3 && <View style={styles.progressLine} />}
          </React.Fragment>
        ))}
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

export default PhotoPromptScreen;
