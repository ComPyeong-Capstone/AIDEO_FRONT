import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Text,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';

import {styles} from '../../styles/shorts/prompInputStyles';
import CustomButton from '../../styles/button';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
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

      const res = await generateMaterial({title: trimmedPrompt, duration});
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

      setResult(resultData);

      if (backgroundMode) {
        setNextData(resultData);
        backgroundTimer = setTimeout(() => {
          setShowCompleteModal(true);
        }, 500);
      } else {
        navigation.navigate('ImageSelectionScreen', resultData);
      }
    } catch (error: any) {
      Alert.alert('에러', '사진 및 자막 생성에 실패했습니다.');
    } finally {
      setLoading(false);
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
    setBackgroundMode(true);
    setLoading(false);

    if (navigationRef.isReady()) {
      navigationRef.navigate('Main', {screen: 'Home'});
    }
  };

  const handleModalConfirm = () => {
    setShowCompleteModal(false);

    if (nextData) {
      navigationRef.navigate('ShortsStack', {
        screen: 'ImageSelectionScreen',
        params: nextData,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <AnimatedProgressBar progress={2 / 6} />

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

        <View
          style={[
            styles.fixedButtonWrapper,
            {
              paddingBottom: insets.bottom,
              gap: 12,
              justifyContent: 'center',
            },
          ]}>
          <CustomButton
            title="이전"
            onPress={() => navigation.goBack()}
            type="gray"
            style={{flex: 1, width: '45%', height: 42}}
          />
          <CustomButton
            title="이미지 및 자막 생성"
            onPress={handleGenerate}
            type="gradient"
            disabled={loading}
            style={{flex: 1, width: '45%', height: 42}}
          />
        </View>

        {loading && (
          <Modal transparent animationType="fade">
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>생성 중입니다...</Text>
                <CustomButton
                  title="구경하기"
                  onPress={handleExplore}
                  type="gradient"
                  style={{width: '90%', height: 44}}
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
                <CustomButton
                  title="확인"
                  onPress={handleModalConfirm}
                  type="gradient"
                  style={{width: '90%', height: 44}}
                />
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PromptInputScreen;
