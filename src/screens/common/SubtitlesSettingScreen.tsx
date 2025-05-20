import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import {generateFinalVideo} from '../../api/generateApi';
import styles from '../../styles/common/subtitlesSettingStyles';

type NavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'SubtitlesSettingScreen'
>;

const FONT_PATHS = [
  {
    label: 'Cafe24Ssurround',
    value: '../font/Cafe24Ssurround-v2.0/Cafe24Ssurround-v2.0.ttf',
  },
  {
    label: 'Cafe24Danjunghae',
    value: '../font/Cafe24Danjunghae-v2.0/Cafe24Danjunghae-v2.0.ttf',
  },
  {
    label: 'Cafe24Simplehae',
    value: '../font/Cafe24Simplehae-v2.0/Cafe24Simplehae-v2.0.ttf',
  },
  {
    label: 'Cafe24Ohsquare',
    value: '../font/Cafe24Ohsquare-v2.0/Cafe24Ohsquare-v2.0.ttf',
  },
];

const FONT_EFFECTS = ['poping', 'split', 'custom_poping'] as const;
type FontEffect = (typeof FONT_EFFECTS)[number];

const FONT_COLORS = [
  'white',
  'black',
  'blue',
  'red',
  'yellow',
  'green',
  'orange',
  'navy',
  'purple',
] as const;
type FontColor = (typeof FONT_COLORS)[number];

const SUBTITLE_POSITIONS: {label: string; value: -150 | -450}[] = [
  {label: '하단 (-150)', value: -150},
  {label: '중앙 (-450)', value: -450},
];

const SubtitlesSettingScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const {videos, subtitles, music} = route.params as {
    videos: string[];
    subtitles: string[];
    music: string;
  };

  const [fontPath, setFontPath] = useState<string>(FONT_PATHS[0].value);
  const [fontEffect, setFontEffect] = useState<FontEffect>('poping');
  const [fontColor, setFontColor] = useState<FontColor>('white');
  const [subtitleY, setSubtitleY] = useState<-150 | -450>(-150);
  const [loading, setLoading] = useState(false);

  const handleGenerateFinalVideo = async () => {
    try {
      setLoading(true);
      const cleanedVideoFilenames = videos.map(v => v.split('/').pop() || '');
      const cleanedMusic = music.split('/').pop() || 'bgm_01.mp3';

      const response = await generateFinalVideo({
        videos: cleanedVideoFilenames,
        subtitles,
        music_url: cleanedMusic,
        font_path: fontPath,
        font_effect: fontEffect,
        font_color: fontColor,
        subtitle_y_position: subtitleY,
      });

      navigation.navigate('ResultScreen', {
        videos: [response.final_video_url],
        subtitles,
        music,
      });
    } catch (e) {
      Alert.alert('에러', '최종 영상 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>자막 폰트</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={fontPath}
                onValueChange={value => setFontPath(value)}>
                {FONT_PATHS.map(font => (
                  <Picker.Item
                    key={font.value}
                    label={font.label}
                    value={font.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>자막 효과</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={fontEffect}
                onValueChange={value => setFontEffect(value)}>
                {FONT_EFFECTS.map(effect => (
                  <Picker.Item key={effect} label={effect} value={effect} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>자막 색상</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={fontColor}
                onValueChange={value => setFontColor(value)}>
                {FONT_COLORS.map(color => (
                  <Picker.Item key={color} label={color} value={color} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>자막 위치</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={subtitleY}
                onValueChange={value => setSubtitleY(value)}>
                {SUBTITLE_POSITIONS.map(pos => (
                  <Picker.Item
                    key={pos.value}
                    label={pos.label}
                    value={pos.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* ✅ 하단 고정 대신 스크롤에 포함 */}
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="최종 영상 생성"
              onPress={handleGenerateFinalVideo}
              disabled={loading}
              type="primary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SubtitlesSettingScreen;
