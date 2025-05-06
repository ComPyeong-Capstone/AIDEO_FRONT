import React, {useState} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from '../../styles/shorts/prompInputStyles';
import CustomButton from '../../styles/button';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import ProgressBar from '../../components/ProgressBar';
import {generateMaterial} from '../../api/generateApi';

type Props = NativeStackScreenProps<ShortsStackParamList, 'PromptInputScreen'>;

const PromptInputScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const {duration} = route.params;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('입력 오류', '프롬프트를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const result = await generateMaterial({title: prompt, duration});
      navigation.navigate('ImageSelectionScreen', {
        duration,
        prompt,
        imageUrls: result.image_urls,
        subtitles: result.subtitles,
      });
    } catch (error) {
      console.error('❌ API 호출 실패:', error);
      Alert.alert('에러', '사진 및 자막 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행바 */}
      <View style={[styles.progressBarWrapper, {marginTop: insets.top + 5}]}>
        <ProgressBar currentStep={2} />
      </View>

      {/* ✅ 입력 필드 */}
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

      {/* ✅ 버튼 */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
        />
        <CustomButton
          title="영상 생성"
          onPress={handleGenerate}
          type="primary"
          disabled={loading}
        />
      </View>

      {/* ✅ 로딩 인디케이터 */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>생성 중입니다...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PromptInputScreen;
