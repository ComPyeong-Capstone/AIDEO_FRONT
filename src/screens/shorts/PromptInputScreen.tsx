import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const PromptInputScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions(); // ✅ 반응형 적용
  const insets = useSafeAreaInsets(); // ✅ 노치 대응
  const [prompt, setPrompt] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 최상단 4단계 진행바 (노치 대응) */}
      <View
        style={[
          styles.progressContainer,
          {top: insets.top + scaleSize(10, height)},
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
      </View>

      {/* 📌 프롬프트 입력 */}
      <View
        style={[
          styles.inputContainer,
          {width: scaleSize(300, width), height: scaleSize(150, height)},
        ]}>
        <TextInput
          style={[styles.input, {fontSize: scaleFont(16, width)}]}
          placeholder="프롬프트 입력"
          placeholderTextColor="#51BCB4"
          multiline
          onChangeText={setPrompt}
          value={prompt}
        />
      </View>

      {/* 📌 버튼 추가 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.prevButton,
            {width: scaleSize(140, width)},
          ]}
          onPress={() => navigation.goBack()} // ✅ 이전 단계로 이동
        >
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.nextButton,
            {width: scaleSize(140, width)},
          ]}
          onPress={() => navigation.navigate('ImageSelectionScreen')} // ✅ ImageSelectionScreen으로 이동
        >
          <Text style={styles.buttonText}>이미지 생성</Text>
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
  inputContainer: {
    borderWidth: 2,
    borderColor: '#51BCB4',
    borderRadius: scaleSize(10, 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(80, 375),
  },
  input: {
    color: '#51BCB4',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: scaleSize(30, 375),
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

export default PromptInputScreen;
