import React, {useState} from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from '../../styles/shorts/prompInputStyles';
import CustomButton from '../../styles/button';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import ProgressBar from '../../components/ProgressBar';

type Props = NativeStackScreenProps<ShortsStackParamList, 'PromptInputScreen'>;

const PromptInputScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [prompt, setPrompt] = useState('');
  const {duration} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행바 - 노치 아래 최상단 고정 */}
      <View style={[styles.progressBarWrapper, {marginTop: insets.top + 5}]}>
        <ProgressBar currentStep={2} />
      </View>

      {/* ✅ 입력 필드 중앙 정렬 */}
      <View style={styles.contentWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="프롬프트 입력"
            placeholderTextColor="#51BCB4"
            multiline
            onChangeText={setPrompt}
            value={prompt}
          />
        </View>
      </View>

      {/* ✅ 하단 버튼 */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
        />
        <CustomButton
          title="영상 생성"
          onPress={() =>
            navigation.navigate('ImageSelectionScreen', {
              duration,
              prompt,
            })
          }
          type="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default PromptInputScreen;
