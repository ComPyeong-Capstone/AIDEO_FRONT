import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';

import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import styles from '../../styles/common/finalVideoStyles';
import ProgressBar from '../../components/ProgressBar';
import CustomButton from '../../styles/button';

type NavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'FinalVideoScreen'
>;

interface Props {
  navigation: NavigationProp;
}

const FinalVideoScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {
    from = 'photo',
    videos = [],
    duration,
    prompt,
    imageUrls,
    subtitles,
    music,
  } = route.params as {
    from?: 'photo' | 'shorts';
    videos?: string[];
    duration: number;
    prompt: string;
    imageUrls: string[];
    subtitles: string[];
    music?: string;
  };

  const currentStep = from === 'photo' ? 3 : 4;

  return (
    <SafeAreaView style={styles.container}>
      {/* 진행바 */}
      <View style={[styles.progressBarWrapper, {marginTop: insets.top}]}>
        <ProgressBar currentStep={currentStep} mode={from} />
      </View>

      {/* 영상 박스 */}
      <View style={styles.sliderContainer}>
        <View style={styles.videoWrapper}>
          <Swiper
            loop={false}
            showsButtons={false}
            activeDotColor="#00A6FB"
            dotColor="#D9D9D9"
            paginationStyle={styles.pagination}
            containerStyle={styles.swiperContainer}>
            {Array.isArray(videos) && videos.length > 0 ? (
              videos.map((item, index) => (
                <View key={index} style={styles.videoItem}>
                  <Text style={styles.videoText}>
                    {item?.trim() ? item : '영상 없음'}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.videoItem}>
                <Text style={styles.videoText}>영상 없음</Text>
              </View>
            )}
          </Swiper>
        </View>
      </View>

      {/* 배경 음악 버튼 */}
      <View style={styles.musicSpacing} />
      <TouchableOpacity
        style={styles.musicButton}
        onPress={() =>
          navigation.navigate('MusicSelectionScreen', {
            duration,
            prompt,
            imageUrls,
            subtitles,
            music,
          })
        }>
        <Text style={styles.buttonText}>배경 음악</Text>
      </TouchableOpacity>

      {/* 하단 버튼 */}
      <View style={[styles.buttonContainer, {bottom: insets.bottom + 10}]}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
          style={[styles.button, styles.prevButton]}
          textStyle={styles.buttonText}
        />
        <CustomButton
          title="영상 생성"
          onPress={() => navigation.navigate('ResultScreen')}
          type="primary"
          style={[styles.button, styles.nextButton]}
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
};

export default FinalVideoScreen;
