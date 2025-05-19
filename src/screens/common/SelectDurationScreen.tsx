import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  useNavigation,
  useRoute,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {styles} from '../../styles/common/selectDurationStyles';
import ProgressBar from '../../components/ProgressBar';
import {PhotoStackParamList} from '../../navigator/PhotoNavigator';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import {AppStackParamList} from '../../types/navigation';

// 공용 Param 정의
type CommonParamList = {
  SelectDurationScreen: {mode: 'photo' | 'shorts'};
};

// 네비게이션 타입 조합
type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<CommonParamList, 'SelectDurationScreen'>,
  NativeStackNavigationProp<AppStackParamList>
>;

const SelectDurationScreen: React.FC = () => {
  const [duration, setDuration] = useState<number>(5);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const {mode} = route.params as CommonParamList['SelectDurationScreen'];

  // 🔽 슬라이드(back gesture) 시에도 Main(Home)으로 이동
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      navigation.navigate('Main', {screen: 'Home'});
    });
    return unsubscribe;
  }, [navigation]);

  const handleNext = () => {
    if (mode === 'photo') {
      (navigation as any).navigate(
        'PhotoPromptScreen' satisfies keyof PhotoStackParamList,
        {duration} satisfies PhotoStackParamList['PhotoPromptScreen'],
      );
    } else {
      (navigation as any).navigate(
        'PromptInputScreen' satisfies keyof ShortsStackParamList,
        {duration} satisfies ShortsStackParamList['PromptInputScreen'],
      );
    }
  };

  const handleBack = () => {
    navigation.navigate('Main', {screen: 'Home'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.progressBarWrapper, {marginTop: insets.top}]}>
        <ProgressBar currentStep={1} mode={mode} />
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>영상 길이를 선택하세요</Text>

        <View style={styles.sliderWrapper}>
          <Text style={styles.sliderValueText}>{duration}초</Text>

          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={60}
            step={5}
            value={duration}
            minimumTrackTintColor="#51BCB4"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#51BCB4"
            onValueChange={value => setDuration(value)}
          />
        </View>
      </View>

      <View style={[styles.fixedButtonWrapper, {paddingBottom: insets.bottom}]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.nextButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectDurationScreen;
