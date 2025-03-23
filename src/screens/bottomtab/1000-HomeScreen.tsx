import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from '../../styles/bottomtab/1000-homeStyles';
import {scaleSize, scaleFont} from '../../styles/responsive';

// ✅ 네비게이션 타입 지정
type RootStackParamList = {
  ShortsPlayerScreen: {title: string; creator: string};
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

interface VideoItem {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
}

const videoData: VideoItem[] = [
  {
    id: '1',
    title: '제목 1',
    creator: '사용자1',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: '제목 2',
    creator: '사용자2',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: '제목 3',
    creator: '사용자3',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: '제목 4',
    creator: '사용자4',
    thumbnail: 'https://via.placeholder.com/150',
  },
];

const HomeScreen: React.FC = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>(); // ✅ 네비게이션 타입 지정
  const itemWidth = (width - scaleSize(40)) / 2;
  const itemHeight = itemWidth * 0.75;
  const paddingBottomValue = scaleSize(40);

  const renderItem = ({item}: {item: VideoItem}) => (
    <TouchableOpacity
      style={[styles.videoContainer, {width: itemWidth}]}
      onPress={
        () =>
          navigation.navigate('ShortsPlayerScreen', {
            title: item.title,
            creator: item.creator,
          }) // ✅ 에러 해결
      }>
      <Image
        source={{uri: item.thumbnail}}
        style={[
          styles.thumbnail,
          {height: itemHeight, borderRadius: scaleSize(8)},
        ]}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, {fontSize: scaleFont(16)}]}>
          {item.title}
        </Text>
        <View style={styles.creatorContainer}>
          <View
            style={[
              styles.profileCircle,
              {
                width: scaleSize(24),
                height: scaleSize(24),
                borderRadius: scaleSize(12),
                marginRight: scaleSize(8),
              },
            ]}
          />
          <Text style={[styles.creator, {fontSize: scaleFont(14)}]}>
            {item.creator}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>VideoAI</Text>
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: paddingBottomValue},
        ]}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
