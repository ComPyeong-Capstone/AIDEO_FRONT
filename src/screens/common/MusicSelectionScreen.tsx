import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/common/musicSelectionStyles';
import CustomButton from '../../styles/button';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import {PhotoStackParamList} from '../../navigator/PhotoNavigator';

type ShortsProps = NativeStackScreenProps<
  ShortsStackParamList,
  'MusicSelectionScreen'
>;
type PhotoProps = NativeStackScreenProps<
  PhotoStackParamList,
  'MusicSelectionScreen'
>;
type Props = ShortsProps | PhotoProps;

const MusicSelectionScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const musicList = ['음악 1', '음악 2', '음악 3'];
  const [selectedMusic, setSelectedMusic] = useState<string | null>(
    route.params?.music || null,
  );

  const getMusicItemStyle = (music: string) => [
    styles.musicItem,
    selectedMusic === music ? styles.selectedMusic : styles.unselectedMusic,
  ];

  const handleConfirm = () => {
    if (!selectedMusic) return;

    if ('imageUrls' in route.params) {
      // Shorts 흐름
      const nav = navigation as NativeStackScreenProps<
        ShortsStackParamList,
        'MusicSelectionScreen'
      >['navigation'];
      nav.navigate('FinalVideoScreen', {
        duration: route.params.duration,
        prompt: route.params.prompt,
        imageUrls: route.params.imageUrls,
        subtitles: route.params.subtitles,
        music: selectedMusic,
      });
    } else {
      // Photo 흐름
      const nav = navigation as NativeStackScreenProps<
        PhotoStackParamList,
        'MusicSelectionScreen'
      >['navigation'];
      nav.navigate('FinalVideoScreen', {
        prompt: route.params.prompt,
        images: route.params.images,
        music: selectedMusic,
      });
    }
  };

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
          onPress={handleConfirm}
          type="primary"
          style={[styles.button, styles.nextButton]}
        />
      </View>
    </SafeAreaView>
  );
};

export default MusicSelectionScreen;
