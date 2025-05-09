import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Entypo';

import {styles} from '../../styles/shorts/imageSelectionStyles';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import ProgressBar from '../../components/ProgressBar';

type Props = NativeStackScreenProps<
  ShortsStackParamList,
  'ImageSelectionScreen'
>;

const ImageSelectionScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {imageUrls, subtitles, duration, prompt} = route.params;
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 왼쪽 상단 뒤로가기 */}
      <TouchableOpacity
        style={[styles.backButton, {top: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={28} color="#333" />
      </TouchableOpacity>

      {/* ✅ 진행바 */}
      <View style={styles.progressBarWrapper}>
        <ProgressBar currentStep={3} />
      </View>

      {/* ✅ 이미지 슬라이더 */}
      <View style={styles.sliderWrapper}>
        <Swiper
          loop={false}
          showsButtons={false}
          showsPagination={false} // 기본 점 숨김
          onIndexChanged={index => setSelectedIndex(index)}
          containerStyle={styles.swiperContainer}>
          {imageUrls.map((uri, index) => (
            <View key={index} style={styles.imageBox}>
              <Image source={{uri}} style={styles.image} resizeMode="cover" />
            </View>
          ))}
        </Swiper>

        {/* ✅ 커스텀 페이지 점 */}
        <View style={styles.customPagination}>
          {imageUrls.map((_, index) => (
            <Text
              key={index}
              style={
                index === selectedIndex
                  ? styles.progressDotActive
                  : styles.progressDotInactive
              }>
              ●
            </Text>
          ))}
        </View>
      </View>

      {/* ✅ 자막 박스 */}
      <View style={styles.captionBox}>
        <Text style={styles.captionText} numberOfLines={2}>
          {subtitles[selectedIndex] || '자막 없음'}
        </Text>
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
          onPress={() =>
            navigation.navigate('FinalVideoScreen', {
              duration,
              prompt,
              imageUrls,
              subtitles,
            })
          }
          type="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default ImageSelectionScreen;
