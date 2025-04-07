import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/bottomtab/4000-notificationsStyles';
import {scaleSize, scaleFont} from '../../styles/responsive';
import {
  getNotifications,
  markNotificationAsRead,
  Notification,
} from '../../api/notificationApi';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('알림 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 아이콘 매핑 함수
  const getIconName = (type: string) => {
    switch (type) {
      case 'LIKE':
        return 'thumbs-up-outline';
      case 'COMMENT':
        return 'chatbubble-outline';
      case 'COMMENT_LIKE':
        return 'heart-outline';
      default:
        return 'notifications-outline';
    }
  };

  const handlePressNotification = async (notiId: number) => {
    try {
      await markNotificationAsRead(notiId);
      // UI 갱신
      setNotifications(prev =>
        prev.map(n => (n.notiId === notiId ? {...n, notiRead: true} : n)),
      );
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
  };

  const renderItem = ({item}: {item: Notification}) => (
    <TouchableOpacity onPress={() => handlePressNotification(item.notiId)}>
      <View
        style={[
          styles.notificationContainer,
          {
            backgroundColor: item.notiRead ? '#f5f5f5' : 'white',
          },
        ]}>
        <Text style={[styles.notificationText, {fontSize: scaleFont(16)}]}>
          {item.notiType === 'LIKE'
            ? '누군가 게시물을 좋아요 했습니다.'
            : item.notiType === 'COMMENT'
            ? '누군가 댓글을 달았습니다.'
            : '누군가 댓글을 좋아요 했습니다.'}
        </Text>
        <Ionicons
          name={getIconName(item.notiType)}
          size={scaleSize(20)}
          color="#51BCB4"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={[
          styles.header,
          {fontSize: scaleFont(20), marginBottom: scaleSize(15)},
        ]}>
        알림
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#51BCB4" />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.notiId.toString()}
          contentContainerStyle={{paddingBottom: scaleSize(30)}}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
