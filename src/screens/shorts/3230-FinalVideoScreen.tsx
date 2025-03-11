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
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import styles from '../../styles/photo/FinalVideoStyles'; // 스타일 파일 분리

// ✅ 네비게이션 타입 정의
type FinalVideoScreenNavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'FinalVideoScreen'
>;

interface Props {
  navigation: FinalVideoScreenNavigationProp;
}

const FinalVideoScreen: React.FC<Props> = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // ✅ 더미 데이터 (생성된 동영상 목록)
  const videos = ['생성된 동영상 1', '생성된 동영상 2', '생성된 동영상 3'];
  const [selectedVideo, setSelectedVideo] = useState<number>(0);
  const translateX = new Animated.Value(0);

  const handleNext = () => {
    if (selectedVideo < videos.length - 1) {
      Animated.timing(translateX, {
        toValue: -width * (selectedVideo + 1),
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedVideo(selectedVideo + 1));
    }
  };

  const handlePrev = () => {
    if (selectedVideo > 0) {
      Animated.timing(translateX, {
        toValue: -width * (selectedVideo - 1),
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedVideo(selectedVideo - 1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 최상단 진행 상태 점 */}
      <View style={[styles.progressContainer, {top: insets.top + 10}]}>
        {['○', '●', '○', '○'].map((dot, index) => (
          <React.Fragment key={index}>
            <Text
              style={
                index === 1
                  ? styles.progressDotActive
                  : styles.progressDotInactive
              }>
              {dot}
            </Text>
            {index < 3 && <View style={styles.progressLine} />}
          </React.Fragment>
        ))}
      </View>

      {/* 📌 동영상 슬라이드 */}
      <View
        style={[
          styles.sliderContainer,
          {width: width * 0.9, height: height * 0.4},
        ]}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.videoItem,
            {
              transform: [{translateX}],
              width: width * 0.7,
              height: height * 0.35,
            },
          ]}>
          <Text style={styles.videoText}>{videos[selectedVideo]}</Text>
        </Animated.View>
        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 배경 음악 선택 버튼 */}
      <TouchableOpacity
        style={[styles.musicButton, {width: width * 0.7, height: 40}]}
        onPress={() => navigation.navigate('MusicSelectionScreen')}>
        <Text style={styles.buttonText}>배경 음악</Text>
      </TouchableOpacity>

      {/* 📌 하단 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={() => navigation.navigate('ResultScreen')}>
          <Text style={styles.buttonText}>영상 병합</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FinalVideoScreen;
