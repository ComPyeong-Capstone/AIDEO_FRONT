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

const FinalVideoScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
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
    <SafeAreaView
      style={[
        styles.container,
        {paddingTop: insets.top + scaleSize(20, width)},
      ]}>
      {/* ✅ 최상단 4단계 진행바 - HomeScreen과 동일한 위치 */}
      <View
        style={[
          styles.progressContainer,
          {marginTop: scaleSize(10, width), width: width * 0.9},
        ]}>
        <Text
          style={[
            styles.progressDotInactive,
            {fontSize: scaleFont(18, width)},
          ]}>
          ○
        </Text>
        <View style={[styles.progressLine, {width: width * 0.2}]} />
        <Text
          style={[
            styles.progressDotInactive,
            {fontSize: scaleFont(18, width)},
          ]}>
          ○
        </Text>
        <View style={[styles.progressLine, {width: width * 0.2}]} />
        <Text
          style={[
            styles.progressDotInactive,
            {fontSize: scaleFont(18, width)},
          ]}>
          ○
        </Text>
        <View style={[styles.progressLine, {width: width * 0.2}]} />
        <Text
          style={[styles.progressDotActive, {fontSize: scaleFont(18, width)}]}>
          ●
        </Text>
      </View>

      {/* 📌 동영상 슬라이드 */}
      <View
        style={[
          styles.sliderContainer,
          {width: width * 0.9, height: height * 0.4},
        ]}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
          <Text style={[styles.arrowText, {fontSize: scaleFont(24, width)}]}>
            {'<'}
          </Text>
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
          <Text style={[styles.videoText, {fontSize: scaleFont(16, width)}]}>
            {videos[selectedVideo]}
          </Text>
        </Animated.View>
        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Text style={[styles.arrowText, {fontSize: scaleFont(24, width)}]}>
            {'>'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 📌 배경 음악 선택 버튼 */}
      <TouchableOpacity
        style={[
          styles.musicButton,
          {width: width * 0.7, height: scaleSize(40, height)},
        ]}
        onPress={() => navigation.navigate('MusicSelectionScreen')}>
        <Text style={[styles.buttonText, {fontSize: scaleFont(16, width)}]}>
          배경 음악
        </Text>
      </TouchableOpacity>

      {/* 📌 하단 버튼 */}
      <View style={[styles.buttonContainer, {width: width * 0.9}]}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.prevButton,
            {width: width * 0.35, height: scaleSize(40, height)},
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, {fontSize: scaleFont(16, width)}]}>
            이전
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.nextButton,
            {width: width * 0.35, height: scaleSize(40, height)},
          ]}
          onPress={() => navigation.navigate('ResultScreen')}>
          <Text style={[styles.buttonText, {fontSize: scaleFont(16, width)}]}>
            영상 병합
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLine: {
    height: 2,
    backgroundColor: '#51BCB4',
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
    padding: scaleSize(10, 375),
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
    marginTop: scaleSize(25, 375),
  },
  button: {
    alignItems: 'center',
    borderRadius: 15,
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
