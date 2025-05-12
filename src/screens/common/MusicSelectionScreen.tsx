import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/common/musicSelectionStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import CustomButton from '../../styles/button';

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
  const insets = useSafeAreaInsets();
  const musicList = ['음악 1', '음악 2', '음악 3'];
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);

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
          <Text style={styles.musicText}>{music}</Text>
          <Ionicons
            name={selectedMusic === music ? 'pause' : 'play'}
            size={24}
            color="#51BCB4"
          />
        </TouchableOpacity>
      ))}

      {/* ✅ 하단 버튼 그룹 */}
      <View
        style={[styles.buttonContainer, {paddingBottom: insets.bottom + 10}]}>
        <CustomButton
          title="이전"
          onPress={() => navigation.goBack()}
          type="secondary"
          style={[styles.button, styles.prevButton]}
        />
        <CustomButton
          title="선택 완료"
          onPress={() => {
            if (selectedMusic) {
              navigation.navigate('PreviousScreen', {selectedMusic});
            }
          }}
          type="primary"
          style={[styles.button, styles.nextButton]}
        />
      </View>
    </SafeAreaView>
  );
};

export default MusicSelectionScreen;
