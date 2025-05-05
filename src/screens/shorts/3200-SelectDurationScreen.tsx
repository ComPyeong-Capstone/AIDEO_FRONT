import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Slider from '@react-native-community/slider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import {styles} from '../../styles/shorts/selectDurationStyles';

type Props = NativeStackScreenProps<
  ShortsStackParamList,
  'SelectDurationScreen'
>;

const SelectDurationScreen: React.FC<Props> = ({navigation}) => {
  const [duration, setDuration] = useState<number>(30);

  const handleNext = () => {
    navigation.navigate('PromptInputScreen', {duration});
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>영상 길이를 선택하세요</Text>

      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderValueText}>{duration}초</Text>

        <Slider
          style={styles.slider}
          minimumValue={30}
          maximumValue={60}
          step={5}
          value={duration}
          minimumTrackTintColor="#51BCB4"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#51BCB4"
          onValueChange={value => setDuration(value)}
        />
      </View>

      <View style={styles.buttonGroup}>
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
