import React, {useState} from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/photo/MusicSelectionStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {PhotoStackParamList} from '../../navigator/PhotoNavigator';
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

// ✅ 네비게이션 타입 정의
type MusicSelectionScreenNavigationProp = StackNavigationProp<
  PhotoStackParamList,
  'MusicSelectionScreen'
>;

interface Props {
  navigation: MusicSelectionScreenNavigationProp;
}

const MusicSelectionScreen: React.FC<Props> = ({navigation}) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const musicList = ['음악 1', '음악 2', '음악 3'];
  const [selectedMusic] = useState<number | null>(null);

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      {musicList.map((music, index) => (
        <View key={index} style={[styles.musicItem, {width: width * 0.9}]}>
          <Text style={styles.musicText}>{music}</Text>
          <TouchableOpacity>
            <Ionicons name="play" size={24} color="#51BCB4" />
          </TouchableOpacity>
          {selectedMusic === index && (
            <TouchableOpacity
              style={[styles.selectButton, {width: width * 0.5}]}
              onPress={() => navigation.navigate('FinalVideoScreen')}>
              <Text style={styles.selectButtonText}>선택</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* 📌 하단 이전 버튼 */}
      <TouchableOpacity
        style={[styles.prevButton, {width: width * 0.5}]}
        onPress={() => navigation.navigate('FinalVideoScreen')}>
        <Text style={styles.buttonText}>이전</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MusicSelectionScreen;
