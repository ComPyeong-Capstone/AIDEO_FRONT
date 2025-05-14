import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Sound from 'react-native-sound';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/common/musicSelectionStyles';
import CustomButton from '../../styles/button';
import {getMusicPreviews} from '../../api/generateApi';

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

interface MusicPreview {
  title: string;
  url: string;
}

const MusicSelectionScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [musicList, setMusicList] = useState<MusicPreview[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(
    route.params?.music || null,
  );
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);
        const response = await getMusicPreviews();
        setMusicList(response.previews);
      } catch (error) {
        console.error('음악 목록 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMusic();

    return () => {
      stopAndReleaseSound();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopAndReleaseSound = () => {
    if (currentSound) {
      currentSound.stop(() => {
        currentSound.release();
        setCurrentSound(null);
      });
    }
  };

  const playMusic = (url: string) => {
    stopAndReleaseSound();

    const sound = new Sound(url, undefined, error => {
      if (error) {
        console.error('사운드 로드 실패:', error);
        return;
      }
      sound.play(success => {
        if (!success) {
          console.error('음악 재생 실패');
        }
        sound.release();
        setCurrentSound(null);
      });
      setCurrentSound(sound);
    });
  };

  const handleMusicSelect = (url: string) => {
    if (selectedMusic === url) {
      stopAndReleaseSound();
      setSelectedMusic(null);
    } else {
      playMusic(url);
      setSelectedMusic(url);
    }
  };

  const handleBack = () => {
    stopAndReleaseSound();
    navigation.goBack();
  };

  const handleConfirm = () => {
    if (!selectedMusic) return;

    stopAndReleaseSound();

    const selectedTitle =
      musicList.find(m => m.url === selectedMusic)?.title ?? '';

    const commonParams = {
      music: selectedMusic,
      musicTitle: selectedTitle,
      videos: route.params.videos ?? [],
    };

    if ('imageUrls' in route.params) {
      // Shorts 흐름
      const nav = navigation as ShortsProps['navigation'];
      nav.navigate('FinalVideoScreen', {
        ...commonParams,
        from: 'shorts',
        duration: route.params.duration,
        prompt: route.params.prompt,
        imageUrls: route.params.imageUrls,
        subtitles: route.params.subtitles,
      });
    } else {
      // Photo 흐름
      const nav = navigation as PhotoProps['navigation'];
      nav.navigate('FinalVideoScreen', {
        ...commonParams,
        from: 'photo',
        prompt: route.params.prompt,
        images: route.params.images,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      {loading ? (
        <ActivityIndicator size="large" color="#00A6FB" />
      ) : (
        musicList.map((music, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.musicItem,
              selectedMusic === music.url
                ? styles.selectedMusic
                : styles.unselectedMusic,
            ]}
            onPress={() => handleMusicSelect(music.url)}>
            <Text style={styles.musicText}>{music.title}</Text>
            <Ionicons
              name={
                selectedMusic === music.url && currentSound ? 'pause' : 'play'
              }
              size={24}
              color="#51BCB4"
            />
          </TouchableOpacity>
        ))
      )}

      <View
        style={[styles.buttonContainer, {paddingBottom: insets.bottom + 10}]}>
        <CustomButton
          title="이전"
          onPress={handleBack}
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
