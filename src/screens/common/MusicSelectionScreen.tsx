import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Sound from 'react-native-sound'; // ✅ 추가
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
      currentSound?.release(); // ✅ 언마운트 시 사운드 해제
    };
  }, []);

  const playMusic = (url: string) => {
    // ✅ 이미 재생 중인 음악 멈추기
    if (currentSound) {
      currentSound.stop(() => {
        currentSound.release();
      });
      setCurrentSound(null);
    }

    // ✅ 새 음악 로드 및 재생
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
      // ✅ 같은 음악 클릭 시 재생 중지
      currentSound?.stop(() => {
        currentSound.release();
        setCurrentSound(null);
      });
      setSelectedMusic(null);
    } else {
      playMusic(url);
      setSelectedMusic(url);
    }
  };

  const handleConfirm = () => {
    if (!selectedMusic) return;

    if ('imageUrls' in route.params) {
      const nav = navigation as ShortsProps['navigation'];
      nav.navigate('FinalVideoScreen', {
        duration: route.params.duration,
        prompt: route.params.prompt,
        imageUrls: route.params.imageUrls,
        subtitles: route.params.subtitles,
        music: selectedMusic,
      });
    } else {
      const nav = navigation as PhotoProps['navigation'];
      nav.navigate('FinalVideoScreen', {
        prompt: route.params.prompt,
        images: route.params.images,
        music: selectedMusic,
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
