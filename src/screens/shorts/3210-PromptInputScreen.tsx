import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from '../../styles/shorts/prompInputStyles';
import {scaleSize, scaleFont} from '../../styles/responsive';
import CustomButton from '../../styles/button';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator'; // ✅ 네비게이션 타입 가져오기

type Props = NativeStackScreenProps<ShortsStackParamList, 'PromptInputScreen'>;

const PromptInputScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [prompt, setPrompt] = useState<string>('');
  const {duration} = route.params; // ✅ 전달받은 영상 길이

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행바 */}
      <View
        style={[styles.progressContainer, {top: insets.top + scaleSize(10)}]}>
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
        <View style={styles.progressLine} />
        <Text style={[styles.progressDotInactive, {fontSize: scaleFont(18)}]}>
          ○
        </Text>
      </View>

      {/* 📌 프롬프트 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {fontSize: scaleFont(16)}]}
          placeholder="프롬프트 입력"
          placeholderTextColor="#51BCB4"
          multiline
          onChangeText={setPrompt}
          value={prompt}
        />
      </View>

      {/* ✅ 버튼 컨트롤 */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
          style={{marginHorizontal: 8}}
        />
        <CustomButton
          title="영상 생성"
          onPress={
            () => navigation.navigate('ImageSelectionScreen') // 필요하면 prompt, duration 같이 넘기기
          }
          type="primary"
          style={{marginHorizontal: 8}}
        />
      </View>
    </SafeAreaView>
  );
};

export default PromptInputScreen;
