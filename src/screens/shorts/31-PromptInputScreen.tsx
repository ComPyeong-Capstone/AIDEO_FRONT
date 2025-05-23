import React, {useState, useEffect} from 'react';
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

let backgroundTimer: NodeJS.Timeout | null = null;

type Props = NativeStackScreenProps<ShortsStackParamList, 'PromptInputScreen'>;

const PromptInputScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {setResult} = useGenerate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [nextData, setNextData] = useState<
    ShortsStackParamList['ImageSelectionScreen'] | null
  >(null);
  const [backgroundMode, setBackgroundMode] = useState(false);
  const {duration} = route.params;

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim();

    console.log('📤 [handleGenerate] 호출됨');
    console.log('📝 프롬프트:', trimmedPrompt);
    console.log('⏱️ 영상 길이:', duration);

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
      console.log('📡 API 요청 시작 → /generate/material');

      const res = await generateMaterial({title: trimmedPrompt, duration});

      console.log('✅ API 응답 수신 완료');
      console.log('🖼️ image_urls:', res.image_urls);
      console.log('📝 subtitles:', res.subtitles);

      // ✅ 유효한 이미지 URL 필터링
      const filteredImageUrls = res.image_urls.filter(
        url => typeof url === 'string' && url.startsWith('http'),
      );

      if (filteredImageUrls.length !== res.image_urls.length) {
        Alert.alert(
          '⚠️ 일부 이미지 제외',
          '유효하지 않은 이미지 URL이 감지되어 제외되었습니다.',
        );
      }

      if (filteredImageUrls.length !== res.subtitles.length) {
        Alert.alert(
          '데이터 불일치',
          '이미지 수와 자막 수가 맞지 않습니다. 다시 시도해주세요.',
        );
        return;
      }

      const resultData: ShortsStackParamList['ImageSelectionScreen'] = {
        prompt: trimmedPrompt,
        duration,
        imageUrls: filteredImageUrls,
        subtitles: res.subtitles,
      };

      console.log('📦 resultData 구성 완료:', resultData);
      setResult(resultData);

      if (backgroundMode) {
        console.log('🕶️ 백그라운드 모드: true');
        setNextData(resultData);
        backgroundTimer = setTimeout(() => {
          console.log('🎉 생성 완료 모달 표시');
          setShowCompleteModal(true);
        }, 500);
      } else {
        console.log('🚀 ImageSelectionScreen 으로 이동');
        navigation.navigate('ImageSelectionScreen', resultData);
      }
    } catch (error: any) {
      console.error('❌ API 호출 실패:', error);
      if (error.response) {
        console.error('🔍 응답 상태코드:', error.response.status);
        console.error('📦 응답 데이터:', error.response.data);
      }
      Alert.alert('에러', '사진 및 자막 생성에 실패했습니다.');
    } finally {
      setLoading(false);
      console.log('🔚 로딩 종료');
    }
  };

  useEffect(() => {
    return () => {
      if (backgroundTimer) {
        clearTimeout(backgroundTimer);
        backgroundTimer = null;
      }
    };
  }, []);

  const handleExplore = () => {
    console.log('🧭 [앱 구경하기] 버튼 클릭됨');
    setBackgroundMode(true);
    setLoading(false);

    if (navigationRef.isReady()) {
      console.log('📍 navigationRef 통해 Main(Home)으로 이동');
      navigationRef.navigate('Main', {screen: 'Home'});
    }
  };

  const handleModalConfirm = () => {
    console.log('📦 [생성 완료 모달] → 확인 버튼 클릭됨');
    console.log('➡️ nextData:', nextData);
    setShowCompleteModal(false);

    if (nextData) {
      console.log('🚀 ShortsStack → ImageSelectionScreen으로 이동');
      navigationRef.navigate('ShortsStack', {
        screen: 'ImageSelectionScreen',
        params: nextData,
      });
    } else {
      console.warn('⚠️ nextData가 null입니다. 이동 생략');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.progressBarWrapper, {marginTop: insets.top + 10}]}>
        <ProgressBar currentStep={2} />
      </View>

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

      {loading && (
        <Modal transparent animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>생성 중입니다...</Text>
              <CustomButton
                title="앱 구경하기"
                onPress={handleExplore}
                type="primary"
              />
            </View>
          </View>
        </Modal>
      )}

      {showCompleteModal && nextData && (
        <Modal transparent animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <Text style={styles.loadingText}>✅ 생성 완료!</Text>
              <CustomButton title="확인" onPress={handleModalConfirm} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default PromptInputScreen;
