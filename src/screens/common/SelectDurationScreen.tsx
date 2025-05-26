import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  useNavigation,
  useRoute,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from '../../styles/common/selectDurationStyles';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import {PhotoStackParamList} from '../../navigator/PhotoNavigator';
import {ShortsStackParamList} from '../../navigator/ShortsNavigator';
import {AppStackParamList} from '../../types/navigation';
import CustomButton from '../../styles/button';

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = 50;

const durationOptions = Array.from({length: 12}, (_, i) => (i + 1) * 5);

const SelectDurationScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const duration = durationOptions[selectedIndex];
  console.log('✅ 선택된 duration:', duration);

  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<
          {SelectDurationScreen: {mode: 'photo' | 'shorts'}},
          'SelectDurationScreen'
        >,
        NativeStackNavigationProp<AppStackParamList>
      >
    >();
  const route = useRoute();
  const {mode} = route.params as {mode: 'photo' | 'shorts'};

  const handleNext = () => {
    const param = {duration};
    if (mode === 'photo') {
      (navigation as any).navigate('PhotoPromptScreen', param);
    } else {
      (navigation as any).navigate('PromptInputScreen', param);
    }
  };

  const handleBack = () => {
    navigation.navigate('Main', {screen: 'Home'});
  };

  const renderItem = ({item, index}: {item: number; index: number}) => {
    const inputRange = [
      (index - 2) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 2) * ITEM_HEIGHT,
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1.2, 0.8],
      extrapolate: 'clamp',
    });
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          height: ITEM_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{scale}],
          opacity,
          paddingHorizontal: 16,
        }}>
        <Text style={{fontSize: 20, color: '#333'}}>{item}초</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.progressBarWrapper, {marginTop: insets.top}]}>
        <AnimatedProgressBar progress={1 / 5} />
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>영상 길이를 선택하세요</Text>

        <View style={{height: ITEM_HEIGHT * 5, paddingHorizontal: 32}}>
          <Animated.FlatList
            ref={flatListRef}
            data={durationOptions}
            keyExtractor={item => item.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            bounces={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            onMomentumScrollEnd={e => {
              const index = Math.round(
                e.nativeEvent.contentOffset.y / ITEM_HEIGHT,
              );
              setSelectedIndex(index);
            }}
            contentContainerStyle={{paddingVertical: ITEM_HEIGHT * 2}}
          />
        </View>
      </View>

      <View
        style={[
          styles.fixedButtonWrapper,
          {paddingBottom: insets.bottom, gap: 12, justifyContent: 'center'},
        ]}>
        <CustomButton
          title="이전"
          onPress={handleBack}
          type="gray"
          style={{flex: 1, width: '45%', height: 42}} // ✅ 고정 높이로 깔끔하게
        />

        <CustomButton
          title="다음"
          onPress={handleNext}
          type="gradient"
          style={{flex: 1, width: '45%', height: 42}} // ✅ 고정 높이로 깔끔하게
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectDurationScreen;
