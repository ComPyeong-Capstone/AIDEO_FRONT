import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'; // ✅ SafeArea 적용

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const videoData = [
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

const HomeScreen = () => {
  const {width} = useWindowDimensions(); // ✅ 반응형 width 적용
  const itemWidth = (width - scaleSize(40, width)) / 2; // 2열 배치 (여백 포함)
  const itemHeight = itemWidth * 0.75; // ✅ 썸네일 높이 설정
  const paddingBottomValue = scaleSize(40, width); // ✅ 하단 여백 계산

  // ✅ 개별 비디오 항목 렌더링
  const renderItem = ({item}) => (
    <View style={[styles.videoContainer, {width: itemWidth}]}>
      {/* 썸네일 */}
      <Image
        source={{uri: item.thumbnail}}
        style={[
          styles.thumbnail,
          {height: itemHeight, borderRadius: scaleSize(8, width)},
        ]}
      />
      {/* ✅ 제목과 제작자를 썸네일과 분리 */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, {fontSize: scaleFont(16, width)}]}>
          {item.title}
        </Text>
        <View style={styles.creatorContainer}>
          <View
            style={[
              styles.profileCircle,
              {
                width: scaleSize(24, width),
                height: scaleSize(24, width),
                borderRadius: scaleSize(12, width),
                marginRight: scaleSize(8, width),
              },
            ]}
          />
          <Text style={[styles.creator, {fontSize: scaleFont(14, width)}]}>
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
          paddingHorizontal: scaleSize(10, width),
          paddingTop: scaleSize(20, width),
        },
      ]}>
      {/* 상단 타이틀 */}
      <Text
        style={[
          styles.header,
          {fontSize: scaleFont(24, width), marginBottom: scaleSize(20, width)},
        ]}>
        VideoAI
      </Text>

      {/* ✅ 비디오 리스트 */}
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // ✅ 2열 배치
        columnWrapperStyle={styles.columnWrapper} // ✅ 인라인 스타일 제거
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: paddingBottomValue},
        ]} // ✅ 하단 여백 적용
      />
    </SafeAreaView>
  );
};

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D', // ✅ 배경색
  },
  header: {
    fontWeight: 'bold',
    color: '#51BCB4',
  },
  videoContainer: {
    backgroundColor: '#273647', // ✅ 카드 배경색
    borderRadius: 10,
    alignItems: 'center',
    paddingBottom: 10, // ✅ 제목과 제작자 여백 추가
    marginBottom: 15, // ✅ 썸네일 간격 추가
  },
  thumbnail: {
    width: '100%',
  },
  textContainer: {
    alignItems: 'center', // ✅ 제목과 제작자 중앙 정렬
    marginTop: scaleSize(10, 375), // ✅ 썸네일과 간격 조정
  },
  title: {
    fontWeight: 'bold',
    color: '#51BCB4',
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // ✅ 제작자 정보 중앙 정렬
    marginTop: scaleSize(5, 375),
  },
  profileCircle: {
    backgroundColor: '#51BCB4',
  },
  creator: {
    color: '#51BCB4',
  },
  columnWrapper: {
    justifyContent: 'space-between', // ✅ 썸네일 간격 추가 (인라인 스타일 제거)
  },
  contentContainer: {
    // ✅ 하단 여백 추가 (동적 적용)
  },
});

export default HomeScreen;
