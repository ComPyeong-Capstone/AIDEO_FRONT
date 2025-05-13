import React, {useState, useEffect, useCallback} from 'react';
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
import {getComments} from '../../api/commentsApi';
import {createNotification} from '../../api/notificationApi';
import {getPostDetail} from '../../api/playVideo'; // 추가
import Video from 'react-native-video'; // 추가

const ShortsPlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {postId, title, creator, currentUserId, creatorUserId, showComments} =
    route.params as {
      postId: number;
      title: string;
      creator: string;
      currentUserId: number;
      creatorUserId: number;
      showComments?: boolean; // ✅ 선택적 파라미터 추가
    };

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState<any[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isLikedUsersVisible, setIsLikedUsersVisible] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const loadCounts = useCallback(async () => {
    try {
      const comments = await getComments(postId);
      setCommentCount(comments.length);

      const users = await getLikedUsers(postId);
      setLikedUsers(users);
      setLikeCount(users.length);
      setIsLiked(users.some(user => user.userId === currentUserId));
    } catch (error) {
      console.error('댓글/좋아요 수 불러오기 실패:', error);
    }
  }, [postId, currentUserId]);

  useEffect(() => {
    loadCounts();

    if (showComments) {
      setIsCommentsVisible(true); // ✅ 댓글창 자동 열기
    }
  }, [loadCounts, showComments]);

useEffect(() => {
  const fetchPostDetail = async () => {
    try {
      const post = await getPostDetail(postId);
      setVideoURL(post.videoURL ?? null);
    } catch (error) {
      console.error('게시물 상세 조회 실패:', error);
    }
  };

  fetchPostDetail();
}, [postId]);

  const handleToggleLike = async () => {
    try {
      if (isLiked) {
        await cancelLike(postId);
      } else {
        await postLike(postId);

        if (currentUserId !== creatorUserId) {
          await createNotification({
            receiverId: creatorUserId,
            postId,
            type: 'LIKE',
          });
        }
      }

      await loadCounts(); // 좋아요 변경 후 다시 불러오기
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
           {videoURL ? (
             <Video
               source={{ uri: videoURL }}
               style={styles.videoPlayer}
               resizeMode="cover"
               repeat
               muted={false}
               controls
             />
           ) : (
             <Text style={styles.videoText}>영상 불러오는 중...</Text>
           )}
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
            <Text style={styles.count}>{commentCount}</Text>
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
          onClose={() => {
            setIsCommentsVisible(false);
            loadCounts(); // 댓글 작성 후 다시 카운트 로드
          }}
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
