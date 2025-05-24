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
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import {Dropdown} from 'react-native-element-dropdown';
import { SelectCountry } from 'react-native-element-dropdown/src/SelectCountry';
import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'SubtitlesSettingScreen'
>;

const FONT_PATHS = [
  { label: '폰트1', value: 'Cafe24Ssurround' },
  { label: '폰트2', value: 'Cafe24Danjunghae' },
  { label: '폰트3', value: 'Cafe24Simplehae' },
  { label: '폰트4', value: 'Cafe24Ohsquare' },
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
  {label: '하단', value: -150},
  {label: '중앙', value: -450},
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
     ]}
   >
     <Text
       style={[
         styles.previewText,
         {
                   position: 'absolute', // ← 필수!

           color: fontColor,
           fontSize: 20,

           fontFamily: fontPath,
bottom: subtitleY === -150 ? 30 : SCREEN_HEIGHT * 0.5 / 2 - 10,
           textShadowColor: 'rgba(0, 0, 0, 0.6)',
           textShadowOffset: { width: 1, height: 1 },
           textShadowRadius: 1,
         },
       ]}
     >
       예시 자막입니다.
     </Text>
   </View>
 </View>


<ScrollView
  contentContainerStyle={[styles.scrollContainer, { position: 'relative' }]} // ✅ 핵심!
  keyboardShouldPersistTaps="handled"
  nestedScrollEnabled
>


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
    placeholder="폰트 선택"
    value={fontPath}
    onChange={item => setFontPath(item.value)}
    dropdownPosition="bottom"
    renderAboveOverlay={false}
  />
</View>



<View style={styles.inlineDropdownWrapper}>
  <View style={{ zIndex: 70, position: 'relative', flex: 1 }}>
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

       {/* 자막 위치 */}
  <View style={{ zIndex: 80, position: 'relative', flex: 1 }}>
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
    </SafeAreaView>
  );
};

export default SubtitlesSettingScreen;
