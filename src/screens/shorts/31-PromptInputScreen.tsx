import React, {useState} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Text,
  Modal,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from '../../styles/shorts/prompInputStyles';
import CustomButton from '../../styles/button';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import ProgressBar from '../../components/ProgressBar';
import {generateMaterial} from '../../api/generateApi';
import {useGenerate} from '../../context/GenerateContext';
import {navigationRef} from '../../navigator/AppNavigator';

type Props = NativeStackScreenProps<ShortsStackParamList, 'PromptInputScreen'>;

const PromptInputScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {setResult} = useGenerate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const {duration} = route.params;

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      Alert.alert('입력 오류', '프롬프트를 입력해주세요.');
      return;
    }

    if (!duration || duration < 5) {
      Alert.alert('입력 오류', '유효한 영상 길이를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      console.log('📤 요청 보냄:', {title: trimmedPrompt, duration});

      const res = await generateMaterial({
        title: trimmedPrompt,
        duration: duration,
      });

      console.log('✅ 응답 성공');
      console.log('🖼️ 이미지 목록:', res.image_urls);
      console.log('📝 자막 목록:', res.subtitles);

      setResult({
        prompt: trimmedPrompt,
        duration,
        imageUrls: res.image_urls,
        subtitles: res.subtitles,
      });

      // ✅ 홈 화면으로 이동
      if (navigationRef.isReady()) {
        navigationRef.navigate('Main', {screen: 'Home'});
      }
    } catch (error: any) {
      console.error('❌ API 실패:', error);
      if (error.response) {
        console.error('🔍 응답 상태:', error.response.status);
        console.error('📦 응답 데이터:', error.response.data);
      }
      Alert.alert('에러', '사진 및 자막 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 진행바 */}
      <View style={[styles.progressBarWrapper, {marginTop: insets.top + 10}]}>
        <ProgressBar currentStep={2} />
      </View>

      {/* 입력 */}
      <View style={styles.contentWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="프롬프트 입력"
            placeholderTextColor="#aaa"
            multiline
            textAlignVertical="top"
            onChangeText={setPrompt}
            value={prompt}
          />
        </View>
      </View>

      {/* 버튼 */}
      <View style={[styles.fixedButtonWrapper, {paddingBottom: insets.bottom}]}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
          style={styles.buttonSpacing}
        />
        <CustomButton
          title="이미지 및 자막 생성"
          onPress={handleGenerate}
          type="primary"
          style={styles.buttonSpacing}
          disabled={loading}
        />
      </View>

      {/* 로딩 모달 */}
      {loading && (
        <Modal transparent animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>생성 중입니다...</Text>
              <CustomButton
                title="앱 구경하기"
                onPress={() => {
                  setLoading(false);
                  if (navigationRef.isReady()) {
                    navigationRef.navigate('Main', {screen: 'Home'});
                  }
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default PromptInputScreen;
