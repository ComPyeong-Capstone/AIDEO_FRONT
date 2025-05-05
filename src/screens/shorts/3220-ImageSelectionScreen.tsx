import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from '../../styles/shorts/imageSelectionStyles';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';

const images = ['사진', '사진', '사진', '사진 2', '사진 3'];

type Props = NativeStackScreenProps<
  ShortsStackParamList,
  'ImageSelectionScreen'
>;

const ImageSelectionScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [_, setSelectedImage] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 진행바 */}
      <View style={[styles.progressBarWrapper, {marginTop: insets.top}]}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressDotInactive}>○</Text>
          <View style={styles.progressLine} />
          <Text style={styles.progressDotInactive}>○</Text>
          <View style={styles.progressLine} />
          <Text style={styles.progressDotActive}>●</Text>
          <View style={styles.progressLine} />
          <Text style={styles.progressDotInactive}>○</Text>
        </View>
      </View>

      {/* ✅ 슬라이더 */}
      <View style={styles.sliderWrapper}>
        <Swiper
          loop={false}
          showsButtons={false}
          activeDotColor="#00A6FB"
          dotColor="#D9D9D9"
          paginationStyle={styles.pagination}
          onIndexChanged={index => setSelectedImage(index)}
          containerStyle={styles.swiperContainer}>
          {images.map((item, index) => (
            <View key={index} style={styles.imageBox}>
              <Text style={styles.imageText}>{item}</Text>
            </View>
          ))}
        </Swiper>
      </View>

      {/* ✅ 자막 */}
      <View style={styles.captionBox}>
        <Text style={styles.captionText}>생성된 자막</Text>
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
          onPress={() => navigation.navigate('FinalVideoScreen')}
          type="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default ImageSelectionScreen;
