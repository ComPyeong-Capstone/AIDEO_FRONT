import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const notifications = [
  {id: '1', text: '○○님께서 좋아요를 눌렀습니다.', icon: 'thumbs-up-outline'},
  {id: '2', text: '○○님께서 댓글을 달았습니다.', icon: 'chatbubble-outline'},
];

const NotificationsScreen = () => {
  const {width} = useWindowDimensions(); // ✅ 반응형 width 적용

  // ✅ 개별 알림 항목 렌더링
  const renderItem = ({item}) => (
    <View style={styles.notificationContainer}>
      <Text style={[styles.notificationText, {fontSize: scaleFont(16, width)}]}>
        {item.text}
      </Text>
      <Ionicons name={item.icon} size={scaleSize(20, width)} color="#51BCB4" />
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingHorizontal: scaleSize(20, width),
          paddingTop: scaleSize(20, width),
        },
      ]}>
      {/* 상단 타이틀 */}
      <Text
        style={[
          styles.header,
          {fontSize: scaleFont(20, width), marginBottom: scaleSize(15, width)},
        ]}>
        알림
      </Text>

      {/* ✅ 알림 리스트 */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: scaleSize(30, width)}} // ✅ 하단 여백 추가
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
    textAlign: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#273647', // ✅ 카드 배경색
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10, // ✅ 리스트 간격 추가
  },
  notificationText: {
    color: '#51BCB4',
  },
});

export default NotificationsScreen;
