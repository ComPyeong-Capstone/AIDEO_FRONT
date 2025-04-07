import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../../styles/shortsPlayer/ShortsPlayerScreenStyles';
import CommentsScreen from './CommentsScreen';
import {postLike, cancelLike, getLikedUsers} from '../../api/postLikeApi';
import {createNotification} from '../../api/notificationApi';

const ShortsPlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {postId, title, creator, currentUserId, creatorUserId} =
    route.params as {
      postId: number;
      title: string;
      creator: string;
      currentUserId: number;
      creatorUserId: number;
    };

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(109); // 임시 값
  const [likedUsers, setLikedUsers] = useState<any[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isLikedUsersVisible, setIsLikedUsersVisible] = useState(false);

  const handleToggleLike = async () => {
    try {
      if (isLiked) {
        await cancelLike(postId);
        setLikeCount(prev => prev - 1);
      } else {
        await postLike(postId);
        setLikeCount(prev => prev + 1);

        // 🔔 게시물 좋아요 알림
        if (currentUserId !== creatorUserId) {
          await createNotification({
            receiverId: creatorUserId,
            postId,
            type: 'LIKE',
          });
        }
      }
      setIsLiked(prev => !prev);
    } catch (error) {
      console.error('게시물 좋아요 실패:', error);
    }
  };

  const handleOpenLikeList = async () => {
    try {
      const users = await getLikedUsers(postId);
      setLikedUsers(users);
      setIsLikedUsersVisible(true);
    } catch (error) {
      console.error('좋아요 유저 목록 불러오기 실패:', error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          {/* 📌 영상 플레이스홀더 */}
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoText}>영상 재생 중</Text>
          </View>

          {/* 📌 좋아요 및 댓글 버튼 */}
          <View style={styles.sideMenu}>
            <TouchableOpacity onPress={handleToggleLike}>
              <Text style={styles.icon}>{isLiked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
            <Text style={styles.count}>{likeCount}</Text>

            <TouchableOpacity onPress={() => setIsCommentsVisible(true)}>
              <Text style={styles.icon}>💬</Text>
            </TouchableOpacity>
            <Text style={styles.count}>20</Text>
          </View>

          {/* 📌 내 게시물일 때만 좋아요 유저 목록 보기 */}
          {currentUserId === creatorUserId && (
            <TouchableOpacity
              style={styles.likeUserButton}
              onPress={handleOpenLikeList}>
              <Text style={styles.likeUserButtonText}>
                ❤️ 좋아요 누른 유저 보기
              </Text>
            </TouchableOpacity>
          )}

          {/* 📌 영상 정보 */}
          <View style={styles.videoInfo}>
            <View style={styles.creatorProfile} />
            <View>
              <Text style={styles.creator}>{creator}</Text>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>

          {/* 📌 뒤로 가기 버튼 */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>◀</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* ✅ 댓글 모달 */}
      <Modal
        visible={isCommentsVisible}
        animationType="slide"
        transparent={true}>
        <CommentsScreen
          postId={postId}
          currentUserId={currentUserId}
          creatorUserId={creatorUserId}
          onClose={() => setIsCommentsVisible(false)}
        />
      </Modal>

      {/* ✅ 좋아요 누른 유저 모달 */}
      <Modal visible={isLikedUsersVisible} animationType="slide">
        <SafeAreaView style={styles.likedUsersContainer}>
          <Text style={styles.likedUsersTitle}>❤️ 좋아요 누른 사람들</Text>
          <FlatList
            data={likedUsers}
            keyExtractor={item => item.userId.toString()}
            renderItem={({item}) => (
              <View style={styles.likedUserItem}>
                <View style={styles.profileCircle} />
                <Text style={styles.likedUserText}>{item.userName}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={() => setIsLikedUsersVisible(false)}>
            <Text style={styles.cancelReply}>닫기</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ShortsPlayerScreen;
