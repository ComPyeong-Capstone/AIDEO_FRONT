import React from 'react';
import {View, Text, FlatList, Image, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../styles/bottomtab/1000-homeStyles'; // ✅ 스타일 가져오기
import {scaleSize, scaleFont} from '../../styles/responsive'; // ✅ 반응형 크기 조정 함수 가져오기

// 📌 비디오 데이터 타입 정의
interface VideoItem {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
}

const videoData: VideoItem[] = [
  {
    id: '1',
    title: '제목',
    creator: '사용자1',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: '제목',
    creator: '사용자2',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: '제목',
    creator: '사용자3',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: '제목',
    creator: '사용자4',
    thumbnail: 'https://via.placeholder.com/150',
  },
];

const HomeScreen: React.FC = () => {
  const {width} = useWindowDimensions();
  const itemWidth = (width - scaleSize(40)) / 2;
  const itemHeight = itemWidth * 0.75;
  const paddingBottomValue = scaleSize(40);

  // ✅ 개별 비디오 항목 렌더링
  const renderItem = ({item}: {item: VideoItem}) => (
    <View style={[styles.videoContainer, {width: itemWidth}]}>
      {/* 썸네일 */}
      <Image
        source={{uri: item.thumbnail}}
        style={[
          styles.thumbnail,
          {height: itemHeight, borderRadius: scaleSize(8)},
        ]}
      />
      {/* ✅ 제목과 제작자를 썸네일과 분리 */}
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
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingHorizontal: scaleSize(10),
          paddingTop: scaleSize(20),
        },
      ]}>
      {/* 상단 타이틀 */}
      <Text
        style={[
          styles.header,
          {fontSize: scaleFont(24), marginBottom: scaleSize(20)},
        ]}>
        VideoAI
      </Text>

      {/* ✅ 비디오 리스트 */}
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={[
          styles.columnWrapper,
          {marginHorizontal: scaleSize(5)},
        ]}
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: paddingBottomValue},
        ]}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
