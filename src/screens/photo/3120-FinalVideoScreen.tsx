import React, {useState} from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {PhotoStackParamList} from '../../navigator/PhotoNavigator';
import styles from '../../styles/photo/FinalVideoStyles';
import {COLORS} from '../../styles/colors';
import CustomButton from '../../styles/button';
import ProgressBar from '../../components/ProgressBar';

type FinalVideoScreenNavigationProp = StackNavigationProp<
  PhotoStackParamList,
  'FinalVideoScreen'
>;

type FinalVideoScreenRouteProp = RouteProp<
  PhotoStackParamList,
  'FinalVideoScreen'
>;

interface Props {
  navigation: FinalVideoScreenNavigationProp;
  route: FinalVideoScreenRouteProp;
}

const FinalVideoScreen: React.FC<Props> = ({navigation, route}) => {
  const {prompt, images} = route.params;
  const {width} = useWindowDimensions();
  const VIDEO_WIDTH = width * 0.6;
  const VIDEO_HEIGHT = VIDEO_WIDTH * (16 / 9);

  const [selectedVideo, setSelectedVideo] = useState<number>(0);

  // ✅ 반응형 videoItem 스타일 동적 생성
  const getVideoSizeStyle = (
    videoWidth: number,
    videoHeight: number,
    screenWidth: number,
  ) => ({
    width: videoWidth,
    height: videoHeight,
    marginHorizontal: (screenWidth - videoWidth) / 2,
  });

  const handleNext = () => {
    if (selectedVideo < images.length - 1) {
      setSelectedVideo(selectedVideo + 1);
    }
  };

  const handlePrev = () => {
    if (selectedVideo > 0) {
      setSelectedVideo(selectedVideo - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행바 (3단계 중 2단계) */}
      <ProgressBar currentStep={2} mode="photo" />

      {/* 📌 동영상 슬라이드 */}
      <View style={styles.sliderWrapper}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.swiperBox}>
          <Swiper
            loop={false}
            showsButtons={false}
            activeDotColor={COLORS.primary}
            dotColor={COLORS.dotInactive}
            paginationStyle={styles.pagination}
            onIndexChanged={index => setSelectedVideo(index)}
            containerStyle={styles.swiperContainer}>
            {images.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.videoItem,
                  getVideoSizeStyle(VIDEO_WIDTH, VIDEO_HEIGHT, width),
                ]}>
                <Text style={styles.videoText}>
                  {item.uri ? `이미지 ${index + 1}` : '불러오기 실패'}
                </Text>
              </View>
            ))}
          </Swiper>
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 배경 음악 선택 버튼 */}
      <TouchableOpacity
        style={styles.musicButton}
        onPress={() => navigation.navigate('MusicSelectionScreen')}>
        <Text style={styles.buttonText}>배경 음악</Text>
      </TouchableOpacity>

      {/* ✅ 버튼 컨트롤 */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
          style={styles.buttonSpacing}
        />
        <CustomButton
          title="영상 생성"
          onPress={() => navigation.navigate('ResultScreen')}
          type="primary"
          style={styles.buttonSpacing}
        />
      </View>
    </SafeAreaView>
  );
};

export default FinalVideoScreen;
