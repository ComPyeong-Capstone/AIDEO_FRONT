import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const FinalVideoScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // 📌 더미 데이터 (생성된 동영상 목록)
  const videos = ['생성된 동영상 1', '생성된 동영상 2', '생성된 동영상 3'];
  const [selectedVideo, setSelectedVideo] = useState(0);
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
      <View style={[styles.progressContainer, { top: insets.top + scaleSize(10, height) }]}>
        <Text style={[styles.progressDotInactive, { fontSize: scaleFont(18, width) }]}>○</Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotActive, { fontSize: scaleFont(18, width) }]}>●</Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, { fontSize: scaleFont(18, width) }]}>○</Text>
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, { fontSize: scaleFont(18, width) }]}>○</Text>
      </View>

      {/* 📌 동영상 슬라이드 */}
      <View style={[styles.sliderContainer, { width: width * 0.9, height: height * 0.4 }]}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
          <Text style={[styles.arrowText, { fontSize: scaleFont(24, width) }]}>{'<'}</Text>
        </TouchableOpacity>
        <Animated.View style={[styles.videoItem, { transform: [{ translateX }], width: width * 0.7, height: height * 0.35 }]}>
          <Text style={[styles.videoText, { fontSize: scaleFont(16, width) }]}>{videos[selectedVideo]}</Text>
        </Animated.View>
        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Text style={[styles.arrowText, { fontSize: scaleFont(24, width) }]}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 배경 음악 선택 버튼 */}
      <TouchableOpacity style={[styles.musicButton, { width: width * 0.7, height: scaleSize(40, height) }]} onPress={() => navigation.navigate('MusicSelectionScreen')}>
        <Text style={[styles.buttonText, { fontSize: scaleFont(16, width) }]}>배경 음악</Text>
      </TouchableOpacity>

      {/* 📌 하단 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.prevButton]} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, { fontSize: scaleFont(16, width) }]}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => navigation.navigate('ResultScreen')}>
          <Text style={[styles.buttonText, { fontSize: scaleFont(16, width) }]}>영상 병합</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#51BCB4',
    marginHorizontal: 5,
  },
  progressDotActive: {
    color: '#51BCB4',
    fontSize: 18,
  },
  progressDotInactive: {
    color: '#888',
    fontSize: 18,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scaleSize(50, 375),
  },
  videoItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#51BCB4',
  },
  arrowButton: {
    padding: scaleSize(15, 375),
  },
  arrowText: {
    color: '#51BCB4',
  },
  musicButton: {
    borderColor: '#51BCB4',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(15, 375),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 30,
    position: 'absolute',
    bottom: 20,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    width: '45%',
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

export default FinalVideoScreen;
