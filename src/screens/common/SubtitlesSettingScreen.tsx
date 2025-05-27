import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import CustomButton from '../../styles/button';
import styles from '../../styles/common/subtitlesSettingStyles';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import {Dropdown} from 'react-native-element-dropdown';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

type NavigationProp = StackNavigationProp<
  ShortsStackParamList,
  'SubtitlesSettingScreen'
>;

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

const FONT_COLOR_OPTIONS = FONT_COLORS.map(color => ({
  label: color,
  value: color,
}));

const SUBTITLE_POSITIONS: {label: string; value: 'bottom' | 'center'}[] = [
  {label: '하단', value: 'bottom'},
  {label: '중앙', value: 'center'},
];

const SubtitlesSettingScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const {
    videos,
    subtitles,
    music,
    previewImage = '',
  } = route.params as {
    videos: string[];
    subtitles: string[];
    music: string;
    previewImage: string;
  };

  // ✅ 상세 로그 출력
  useEffect(() => {
    console.log('🧪 SubtitlesSettingScreen mounted');
    console.log('📦 previewImage:', previewImage);
    console.log('📦 videos:', videos);
    console.log('📦 subtitles:', subtitles);
    console.log('📦 music:', music);
  }, []);

  const previewSubtitle = '예시 자막입니다.';

  const [fontPath, setFontPath] = useState(FONT_PATHS[0].value);
  const [previewFont, setPreviewFont] = useState(FONT_PATHS[0].previewFont);
  const [fontColor, setFontColor] = useState<FontColor>('white');
  const [subtitleY, setSubtitleY] = useState<'bottom' | 'center'>('bottom');

  const goToEffectPreview = () => {
    navigation.navigate('EffectPreviewScreen', {
      videos,
      subtitles,
      music,
      font_path: fontPath,
      font_family: previewFont,
      font_color: fontColor,
      subtitle_y_position: subtitleY,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AnimatedProgressBar progress={3 / 5} />

      <View style={styles.previewContainer}>
        {previewImage ? (
          <ImageBackground
            source={{uri: previewImage}}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              alignSelf: 'center',
            }}
            resizeMode="cover"
            onError={e => {
              console.log('❌ Image load error:', e.nativeEvent);
            }}>
            <Text
              style={[
                styles.previewText,
                {
                  color: fontColor,
                  fontFamily: previewFont,
                  bottom: subtitleY === 'bottom' ? 30 : IMAGE_HEIGHT / 2 - 10,
                  textShadowColor: 'rgba(0, 0, 0, 0.6)',
                  textShadowOffset: {width: 1, height: 1},
                  textShadowRadius: 1,
                },
              ]}>
              {previewSubtitle}
            </Text>
          </ImageBackground>
        ) : (
          <View
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              backgroundColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: '#555'}}>이미지를 불러올 수 없습니다</Text>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContainer, {position: 'relative'}]}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled>
        <View style={styles.row}>
          <View style={styles.halfWidthDropdownWrapper}>
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
                setFontPath(item.value);
                setPreviewFont(item.previewFont);
              }}
              dropdownPosition="bottom"
            />
          </View>

          <View style={styles.halfWidthDropdownWrapper}>
            <Text style={styles.smallLabel}>자막 위치</Text>
            <Dropdown
              style={styles.dropdownHalf}
              containerStyle={styles.dropdownContainer}
              data={SUBTITLE_POSITIONS}
              labelField="label"
              valueField="value"
              value={subtitleY}
              onChange={item => setSubtitleY(item.value)}
              placeholder="위치 선택"
              dropdownPosition="bottom"
            />
          </View>
        </View>

        <View style={styles.firstDropdownWrapper}>
          <Text style={styles.smallLabel}>자막 색상</Text>
          <Dropdown
            style={styles.dropdownHalf}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={FONT_COLOR_OPTIONS}
            labelField="label"
            valueField="value"
            value={fontColor}
            onChange={item => setFontColor(item.value)}
            dropdownPosition="bottom"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <CustomButton
            title="다음"
            onPress={goToEffectPreview}
            type="primary"
            style={{width: '100%'}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubtitlesSettingScreen;
