import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';

import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import styles from '../../styles/shorts/finalVideoStyles';
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
  const videos = ['생성된 동영상 1', '생성된 동영상 2', '생성된 동영상 3'];
  const [_, setSelectedVideo] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행바 */}
      <View style={[styles.progressBarWrapper, {marginTop: insets.top}]}>
        <ProgressBar currentStep={4} />
      </View>

      {/* ✅ 동영상 슬라이드 */}
      <View style={styles.sliderContainer}>
        <TouchableOpacity
          onPress={() => setSelectedVideo(prev => Math.max(0, prev - 1))}
          style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.videoWrapper}>
          <Swiper
            loop={false}
            showsButtons={false}
            activeDotColor="#00A6FB"
            dotColor="#D9D9D9"
            paginationStyle={styles.pagination} // 👈 점 위치 스타일 지정
            onIndexChanged={index => setSelectedVideo(index)}
            containerStyle={styles.swiperContainer}>
            {videos.map((item, index) => (
              <View key={index} style={styles.videoItem}>
                <Text style={styles.videoText}>{item}</Text>
              </View>
            ))}
          </Swiper>
        </View>

        <TouchableOpacity
          onPress={() =>
            setSelectedVideo(prev => Math.min(videos.length - 1, prev + 1))
          }
          style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ 배경 음악 버튼 */}
      <TouchableOpacity
        style={styles.musicButton}
        onPress={() => navigation.navigate('MusicSelectionScreen')}>
        <Text style={styles.buttonText}>배경 음악</Text>
      </TouchableOpacity>

      {/* ✅ 하단 버튼 */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
        />
        <CustomButton
          title="영상 생성"
          onPress={() => navigation.navigate('ResultScreen')}
          type="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default FinalVideoScreen;
