import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import {generateFinalVideo} from '../../api/generateApi';
import styles from '../../styles/common/subtitlesSettingStyles';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import {Dropdown} from 'react-native-element-dropdown';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type NavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'SubtitlesSettingScreen'
>;

// ✅ 서버에 보낼 font_path + 앱 미리보기용 fontFamily 이름 분리
const FONT_PATHS = [
  {
    label: '폰트1',
    value: '../font/Cafe24Ssurround-v2.0/Cafe24Ssurround-v2.0.ttf',
    previewFont: 'Cafe24Ssurround',
  },
  {
    label: '폰트2',
    value: '../font/Cafe24Danjunghae-v2.0/Cafe24Danjunghae-v2.0.ttf',
    previewFont: 'Cafe24Danjunghae',
  },
  {
    label: '폰트3',
    value: '../font/Cafe24Simplehae-v2.0/Cafe24Simplehae-v2.0.ttf',
    previewFont: 'Cafe24Simplehae',
  },
  {
    label: '폰트4',
    value: '../font/Cafe24Ohsquare-v2.0/Cafe24Ohsquare-v2.0.ttf',
    previewFont: 'Cafe24Ohsquare',
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

const SUBTITLE_POSITIONS: {label: string; value: 'bottom' | 'center'}[] = [
  {label: '하단', value: 'bottom'},
  {label: '중앙', value: 'center'},
];

const SubtitlesSettingScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const {videos, subtitles, music} = route.params as {
    videos: string[];
    subtitles: string[];
    music: string;
  };

  const [fontPath, setFontPath] = useState<string>(FONT_PATHS[0].value); // 서버용
  const [previewFont, setPreviewFont] = useState<string>(
    FONT_PATHS[0].previewFont,
  ); // 앱 미리보기용
  const [fontEffect, setFontEffect] = useState<FontEffect>('poping');
  const [fontColor, setFontColor] = useState<FontColor>('white');
  const [subtitleY, setSubtitleY] = useState<'bottom' | 'center'>('bottom');
  const [loading, setLoading] = useState(false);

  const handleGenerateFinalVideo = async () => {
    try {
      setLoading(true);

      const cleanedVideoFilenames = videos.map(v => v.split('/').pop() || '');
      const cleanedMusic = music.split('/').pop() || 'bgm_01.mp3';

      const payload = {
        videos: cleanedVideoFilenames,
        subtitles,
        music_url: cleanedMusic,
        font_path: fontPath,
        font_effect: fontEffect,
        font_color: fontColor,
        subtitle_y_position: subtitleY,
      };

      console.log('🎬 [최종 영상 생성 요청]');
      console.log('📦 요청 Payload:', payload);

      const response = await generateFinalVideo(payload);

      console.log('✅ [서버 응답] 최종 영상 URL:', response.final_video_url);

      navigation.navigate('ResultScreen', {
        videos: [response.final_video_url],
        subtitles,
        music,
      });
    } catch (e) {
      Alert.alert('에러', '최종 영상 생성 실패');
      console.error('❌ 영상 생성 에러:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AnimatedProgressBar progress={3 / 5} />

      <View style={styles.previewContainer}>
        <View
          style={[
            styles.previewBox,
            {
              width: SCREEN_WIDTH * 0.8,
              height: SCREEN_HEIGHT * 0.5,
              alignSelf: 'center',
            },
          ]}>
          <Text
            style={[
              styles.previewText,
              {
                position: 'absolute',
                color: fontColor,
                fontSize: 20,
                fontFamily: previewFont, // ✅ 앱에서는 previewFont 사용
                bottom:
                  subtitleY === 'bottom' ? 30 : (SCREEN_HEIGHT * 0.5) / 2 - 10,
                textShadowColor: 'rgba(0, 0, 0, 0.6)',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 1,
              },
            ]}>
            예시 자막입니다.
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContainer, {position: 'relative'}]}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled>
        <View style={styles.firstDropdownWrapper}>
          <Text style={styles.smallLabel}>폰트</Text>
          <Dropdown
            style={styles.dropdownHalf}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={FONT_PATHS}
            labelField="label"
            valueField="value"
            value={fontPath}
            onChange={item => {
              setFontPath(item.value); // 서버로 보낼 경로
              setPreviewFont(item.previewFont); // 앱 미리보기용
            }}
            dropdownPosition="bottom"
            renderAboveOverlay={false}
          />
        </View>

        <View style={styles.inlineDropdownWrapper}>
          <View style={{zIndex: 70, position: 'relative', flex: 1}}>
            <Text style={styles.smallLabel}>효과</Text>
            <Dropdown
              style={styles.dropdownHalf}
              containerStyle={styles.dropdownContainer}
              data={FONT_EFFECTS.map(effect => ({
                label: effect,
                value: effect,
              }))}
              labelField="label"
              valueField="value"
              value={fontEffect}
              onChange={item => setFontEffect(item.value)}
              placeholder="효과"
              dropdownPosition="bottom"
              renderAboveOverlay={false}
            />
          </View>

          <View style={{zIndex: 80, position: 'relative', flex: 1}}>
            <Text style={styles.smallLabel}>위치</Text>
            <Dropdown
              style={styles.dropdownHalf}
              containerStyle={styles.dropdownContainer}
              data={SUBTITLE_POSITIONS}
              labelField="label"
              valueField="value"
              value={subtitleY}
              onChange={item => setSubtitleY(item.value)}
              placeholder="위치"
              dropdownPosition="bottom"
              renderAboveOverlay={false}
            />
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

     <View style={[styles.buttonWrapper, { marginTop: 10 }]}>
       <CustomButton
         title="최종 영상 생성"
         onPress={handleGenerateFinalVideo}
         disabled={loading}
         type="gradient"
          style={{ width: '95%', height: 42 }}

       />
     </View>

      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>영상 생성 중...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SubtitlesSettingScreen;
