import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {styles} from '../../styles/shortsPlayer/ShortsPlayerScreenStyles';
import CommentsScreen from './CommentsScreen';
import {postLike, cancelLike, getLikedUsers} from '../../api/postLikeApi';
import {getComments} from '../../api/commentsApi';
import {createNotification} from '../../api/notificationApi';
import {getPostDetail} from '../../api/playVideo';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BASE_URL} from '@env';

const ShortsPlayerScreen: React.FC = () => {
  const route = useRoute();
  const {postId, title, creator, currentUserId, creatorUserId, showComments} =
    route.params as {
      postId: number;
      title: string;
      creator: string;
      currentUserId: number;
      creatorUserId: number;
      showComments?: boolean;
    };

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState<any[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isLikedUsersVisible, setIsLikedUsersVisible] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

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
      setIsCommentsVisible(true);
    }
  }, [loadCounts, showComments]);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const post = await getPostDetail(postId);
        setVideoURL(post.videoURL ?? null);

        const rawPath = post.author?.profileImage;
        if (rawPath && typeof rawPath === 'string') {
          setProfileImageUrl(
            rawPath.startsWith('http') ? rawPath : `${BASE_URL}:8080${rawPath}`,
          );
        }
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
      await loadCounts();
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
          {videoURL ? (
            <Video
              source={{uri: videoURL}}
              style={styles.videoPlayer}
              resizeMode="cover"
              repeat
              muted={false}
              controls
            />
          ) : (
            <Text style={styles.videoText}>영상 불러오는 중...</Text>
          )}

          <View style={styles.topBar}>
            <View style={styles.profileTitleContainer}>
              {profileImageUrl && profileImageUrl.startsWith('http') && (
                <Image
                  source={{uri: profileImageUrl}}
                  style={styles.creatorProfile}
                />
              )}
              <View style={styles.creatorInfoWrapper}>
                <Text style={styles.creator}>{creator ?? ''}</Text>
                <Text style={styles.title}>{title ?? ''}</Text>
              </View>
            </View>
          </View>

          <View style={styles.sideMenu}>
            <TouchableOpacity onPress={handleToggleLike}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={32}
                color={isLiked ? 'red' : 'white'}
              />
            </TouchableOpacity>
            <Text style={styles.count}>{likeCount}</Text>

            <TouchableOpacity onPress={() => setIsCommentsVisible(true)}>
              <Ionicons name="chatbubble-outline" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.count}>{commentCount}</Text>

            <TouchableOpacity onPress={() => console.log('공유 기능')}>
              <Ionicons name="share-social-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>

          {currentUserId === creatorUserId && (
            <TouchableOpacity
              style={styles.likeUserButton}
              onPress={handleOpenLikeList}>
              <Text style={styles.likeUserButtonText}>
                ❤️ 좋아요 누른 유저 보기
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <Modal visible={isCommentsVisible} animationType="slide" transparent>
        <View style={styles.commentModalOverlay}>
          <TouchableWithoutFeedback onPress={() => setIsCommentsVisible(false)}>
            <View style={styles.commentModalBackground} />
          </TouchableWithoutFeedback>

          <CommentsScreen
            postId={postId}
            currentUserId={currentUserId}
            creatorUserId={creatorUserId}
            onClose={() => {
              setIsCommentsVisible(false);
              loadCounts();
            }}
          />
        </View>
      </Modal>

      <Modal visible={isLikedUsersVisible} animationType="slide">
        <SafeAreaView style={styles.likedUsersContainer}>
          <View style={styles.modalInnerWrapper}>
            <Text style={styles.likedUsersTitle}>❤️ 좋아요 누른 사람들</Text>
            <FlatList
              data={likedUsers}
              keyExtractor={item => item.userId.toString()}
              renderItem={({item}) => (
                <View style={styles.likedUserItem}>
                  {item.profileImage ? (
                    <Image
                      source={{
                        uri: item.profileImage.startsWith('http')
                          ? item.profileImage
                          : `${BASE_URL}:8080${item.profileImage}`,
                      }}
                      style={styles.profileCircle}
                    />
                  ) : (
                    <View style={styles.profileCircle} />
                  )}
                  <Text style={styles.likedUserText}>{item.userName}</Text>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => setIsLikedUsersVisible(false)}>
              <Text style={styles.cancelReply}>닫기</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ShortsPlayerScreen;
