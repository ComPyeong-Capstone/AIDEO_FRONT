import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const MusicSelectionScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const musicList = ['음악 1', '음악 2', '음악 3'];
  const [selectedMusic, setSelectedMusic] = useState(null);

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      {musicList.map((music, index) => (
        <View
          key={index}
          style={[
            styles.musicItem,
            {
              width: width * 0.9,
              padding: scaleSize(12, width),
              borderRadius: scaleSize(12, width),
            },
          ]}>
          <Text style={[styles.musicText, {fontSize: scaleFont(18, width)}]}>
            {music}
          </Text>
          <TouchableOpacity>
            <Ionicons name="play" size={scaleSize(24, width)} color="#51BCB4" />
          </TouchableOpacity>
          {selectedMusic === index && (
            <TouchableOpacity
              style={[
                styles.selectButton,
                {
                  width: width * 0.5,
                  height: scaleSize(45, height),
                  borderRadius: scaleSize(12, width),
                },
              ]}
              onPress={() => navigation.goBack()}>
              <Text
                style={[
                  styles.selectButtonText,
                  {fontSize: scaleFont(16, width)},
                ]}>
                선택
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* 📌 하단 이전 버튼 */}
      <TouchableOpacity
        style={[
          styles.prevButton,
          {
            width: width * 0.5,
            height: scaleSize(45, height),
            borderRadius: scaleSize(12, width),
          },
        ]}
        onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonText, {fontSize: scaleFont(16, width)}]}>
          이전
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#51BCB4',
    marginVertical: scaleSize(10, 375),
    paddingVertical: scaleSize(10, 375),
  },
  musicText: {
    color: '#51BCB4',
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10, 375),
  },
  selectButtonText: {
    color: '#51BCB4',
    fontWeight: 'bold',
  },
  prevButton: {
    marginTop: scaleSize(20, 375),
    borderWidth: 1,
    borderColor: '#51BCB4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#51BCB4',
    fontWeight: 'bold',
  },
});

export default MusicSelectionScreen;
