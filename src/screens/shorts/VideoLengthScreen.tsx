import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const ShortsVideoScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions(); // ✅ 반응형 적용
  const insets = useSafeAreaInsets(); // ✅ 노치 영역 고려
  const [videoLength, setVideoLength] = useState(30);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 최상단 4단계 진행바 (노치 대응) */}
      <View
        style={[
          styles.progressContainer,
          {top: insets.top + scaleSize(10, height)},
        ]}>
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
          style={[
            styles.progressDotInactive,
            {fontSize: scaleFont(18, width)},
          ]}>
          ○
        </Text>
      </View>

      {/* 📌 영상 길이 선택 */}
      <Text
        style={[
          styles.label,
          {fontSize: scaleFont(18, width), marginTop: scaleSize(0, height)},
        ]}>
        영상 길이
      </Text>
      <Slider
        style={[styles.slider, {width: scaleSize(300, width)}]}
        minimumValue={30}
        maximumValue={60}
        step={5}
        value={videoLength}
        onValueChange={value => setVideoLength(value)}
        minimumTrackTintColor="#51BCB4"
        maximumTrackTintColor="#888"
        thumbTintColor="#51BCB4"
      />
      <View style={[styles.timeLabels, {width: scaleSize(320, width)}]}>
        <Text style={[styles.timeText, {fontSize: scaleFont(18, width)}]}>
          30초
        </Text>
        <Text style={[styles.timeText, {fontSize: scaleFont(18, width)}]}>
          60초
        </Text>
      </View>

      {/* 📌 버튼 추가 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.prevButton,
            {width: scaleSize(100, width)},
          ]}
          onPress={() => navigation.goBack()} // ✅ 뒤로 가기
        >
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.nextButton,
            {width: scaleSize(100, width)},
          ]}
          onPress={() => navigation.navigate('PromptInputScreen')} // ✅ 다음 단계로 이동
        >
          <Text style={styles.buttonText}>다음</Text>
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
    width: '100%', // ✅ 전체 너비 설정
    paddingHorizontal: '10%', // ✅ 중앙 정렬을 위해 양옆 여백 추가
  },
  progressLine: {
    height: 2,
    backgroundColor: '#51BCB4',
    flex: 1, // ✅ 선의 길이를 자동으로 조정
    marginHorizontal: '2%',
  },
  progressDotActive: {
    color: '#51BCB4',
  },
  progressDotInactive: {
    color: '#888',
  },
  label: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: '20%',
  },
  slider: {
    height: scaleSize(40, 375),
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(15, 375),
  },
  timeText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: scaleSize(100, 375),
  },
  button: {
    alignItems: 'center',
    paddingVertical: scaleSize(12, 375),
    borderRadius: scaleSize(20, 375),
  },
  prevButton: {
    backgroundColor: '#ccc',
    marginRight: '2%',
  },
  nextButton: {
    backgroundColor: '#51BCB4',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1F2C3D',
  },
});

export default ShortsVideoScreen;
