import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/bottomtab/4000-notificationsStyles'; // ✅ 스타일 파일 분리
import {scaleSize, scaleFont} from '../../styles/responsive'; // ✅ 반응형 크기 조정 함수 가져오기
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

// 📌 알림 데이터 타입 정의
interface NotificationItem {
  id: string;
  text: string;
  icon: string;
}

// 📌 알림 리스트
const notifications: NotificationItem[] = [
  {id: '1', text: '○○님께서 좋아요를 눌렀습니다.', icon: 'thumbs-up-outline'},
  {id: '2', text: '○○님께서 댓글을 달았습니다.', icon: 'chatbubble-outline'},
];

const NotificationsScreen: React.FC = () => {
  // ✅ 개별 알림 항목 렌더링
  const renderItem = ({item}: {item: NotificationItem}) => (
    <View style={styles.notificationContainer}>
      <Text style={[styles.notificationText, {fontSize: scaleFont(16)}]}>
        {item.text}
      </Text>
      <Ionicons name={item.icon} size={scaleSize(20)} color="#51BCB4" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 타이틀 */}
      <Text
        style={[
          styles.header,
          {fontSize: scaleFont(20), marginBottom: scaleSize(15)},
        ]}>
        알림
      </Text>

      {/* ✅ 알림 리스트 */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: scaleSize(30)}} // ✅ 하단 여백 추가
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
