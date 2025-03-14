import React, {useState} from 'react';
import {Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/shorts/musicSelectionStyles'; // ✅ 스타일 가져오기
import {scaleSize, scaleFont} from '../../styles/responsive'; // ✅ 반응형 함수 가져오기
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

// 📌 네비게이션 타입 정의
type RootStackParamList = {
  MusicSelectionScreen: undefined;
  PreviousScreen: {selectedMusic: string};
};

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'MusicSelectionScreen'
>;
type RouteProps = RouteProp<RootStackParamList, 'MusicSelectionScreen'>;

type Props = {
  navigation: NavigationProps;
  route: RouteProps;
};

const MusicSelectionScreen: React.FC<Props> = ({navigation}) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const musicList = ['음악 1', '음악 2', '음악 3'];
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);

  // ✅ 선택된 음악인지 확인 후 스타일 반환
  const getMusicItemStyle = (music: string) => [
    styles.musicItem,
    selectedMusic === music ? styles.selectedMusic : styles.unselectedMusic,
  ];

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      {musicList.map((music, index) => (
        <TouchableOpacity
          key={index}
          style={getMusicItemStyle(music)}
          onPress={() => setSelectedMusic(music)}>
          <Text style={[styles.musicText, {fontSize: scaleFont(18)}]}>
            {music}
          </Text>
          <Ionicons
            name={selectedMusic === music ? 'pause' : 'play'}
            size={scaleSize(24)}
            color="#51BCB4"
          />
        </TouchableOpacity>
      ))}

      {/* 📌 선택 버튼 */}
      <TouchableOpacity
        style={[
          styles.selectButton,
          {width: width * 0.5, height: scaleSize(45)},
        ]}
        onPress={() => {
          if (selectedMusic) {
            navigation.navigate('PreviousScreen', {selectedMusic});
          }
        }}>
        <Text style={[styles.selectButtonText, {fontSize: scaleFont(16)}]}>
          선택 완료
        </Text>
      </TouchableOpacity>

      {/* 📌 하단 이전 버튼 */}
      <TouchableOpacity
        style={[styles.prevButton, {width: width * 0.5, height: scaleSize(45)}]}
        onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonText, {fontSize: scaleFont(16)}]}>이전</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MusicSelectionScreen;
