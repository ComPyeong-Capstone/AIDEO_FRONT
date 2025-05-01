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
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../styles/bottomtab/4000-notificationsStyles';
import {scaleSize} from '../../styles/responsive';
import {
  getNotifications,
  markNotificationAsRead,
  Notification,
} from '../../api/notificationApi';
import {useUser} from '../../context/UserContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../types/navigation';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {user} = useUser();

  useEffect(() => {
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

    fetchNotifications();
  }, []);

  const getIconName = (type: string) => {
    switch (type) {
      case 'LIKE':
        return 'thumbs-up-outline';
      case 'COMMENT':
        return 'chatbubble-outline';
      case 'COMMENT_LIKE':
        return 'heart-outline';
      case 'REPLY':
        return 'return-down-forward-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationText = (type: string) => {
    switch (type) {
      case 'LIKE':
        return '누군가 게시물을 좋아요 했습니다.';
      case 'COMMENT':
        return '누군가 댓글을 달았습니다.';
      case 'COMMENT_LIKE':
        return '누군가 댓글을 좋아요 했습니다.';
      case 'REPLY':
        return '누군가 내 댓글에 답글을 달았습니다.';
      default:
        return '새로운 알림이 있습니다.';
    }
  };

  const handlePressNotification = async (noti: Notification) => {
    try {
      await markNotificationAsRead(noti.notiId);
      setNotifications(prev =>
        prev.map(n => (n.notiId === noti.notiId ? {...n, notiRead: true} : n)),
      );

      navigation.navigate('ShortsPlayerScreen', {
        postId: noti.postId,
        title: '',
        creator: noti.sender?.userName ?? '',
        currentUserId: user?.userId ?? 0,
        creatorUserId: noti.sender?.userId ?? 0,
        showComments: ['COMMENT', 'COMMENT_LIKE', 'REPLY'].includes(
          noti.notiType,
        ),
      });
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
  };

  const renderItem = ({item}: {item: Notification}) => (
    <TouchableOpacity onPress={() => handlePressNotification(item)}>
      <View
        style={[
          styles.notificationContainer,
          item.notiRead ? styles.readBackground : styles.unreadBackground,
        ]}>
        <Text style={styles.notificationText}>
          {getNotificationText(item.notiType)}
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
      <Text style={styles.header}>알림</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#51BCB4" />
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>새로운 알림이 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.notiId.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
