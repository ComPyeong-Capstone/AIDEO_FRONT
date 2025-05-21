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
  InteractionManager,
  Alert,
  Share,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../../styles/shortsPlayer/ShortsPlayerScreenStyles';
import CommentsScreen from './CommentsScreen';
import {postLike, cancelLike, getLikedUsers} from '../../api/postLikeApi';
import {getComments} from '../../api/commentsApi';
import {createNotification} from '../../api/notificationApi';
import {getPostDetail} from '../../api/playVideo';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BASE_URL} from '@env';
import { deletePost } from '../../api/postApi';
import { useUser } from '../../context/UserContext';
import Clipboard from '@react-native-clipboard/clipboard'; // 상단에 추가

const ShortsPlayerScreen: React.FC = () => {
const { user } = useUser();
  const navigation = useNavigation();
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
const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState<any[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isLikedUsersVisible, setIsLikedUsersVisible] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
const handleDeletePost = async () => {
  try {
    console.log('🧨 삭제 요청 시작');
    console.log('🆔 postId:', postId);
    console.log('🔐 token:', user.token);

    const res = await deletePost(postId, user.token);
    console.log('✅ 응답 결과:', res);

    Alert.alert('삭제 완료', '게시물이 삭제되었습니다.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  } catch (error) {
    console.error('❌ 삭제 실패:', error?.response?.data || error.message);
    Alert.alert('오류', '게시물 삭제 중 문제가 발생했습니다.');
  }
};

const confirmDeletePost = () => {
  Alert.alert(
    '정말 삭제하시겠어요?',
    '삭제한 게시물은 복구할 수 없습니다.',
    [
      { text: '아니요', style: 'cancel' },
      {
        text: '예',
        style: 'destructive',
        onPress: () => {
          InteractionManager.runAfterInteractions(() => {
            handleDeletePost();
          });
        },
      },
    ]
  );
};



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
    if (showComments) setIsCommentsVisible(true);
  }, [loadCounts, showComments]);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const post = await getPostDetail(postId);
        setVideoURL(post.videoURL ?? null);
        setHashtags(post.hashtags ?? []);

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

  const handleEditPost = () => {
    navigation.navigate('URLPosting', {
      finalVideoUrl: videoURL,
      title,
      tags: hashtags.join(' '),
    });
  };
const onShare = async () => {
  try {
    if (!videoURL) {
      Alert.alert('잠시만요', '영상이 아직 로드되지 않았어요.');
      return;
    }

    const shareUrl = `https://3.35.182.180:8000/post/${postId}`; // 클라이언트나 웹뷰로 연결될 링크
    const result = await Share.share({
      message: `[${title}]\n\n ${creator}님의 숏츠를 확인해보세요!\n👉 ${shareUrl}`,
      url: shareUrl, // iOS 전용
    });

    if (result.action === Share.sharedAction) {
      console.log('✅ 공유 완료');
    } else if (result.action === Share.dismissedAction) {
      console.log('❌ 공유 취소');
    }
  } catch (error) {
    console.error('❌ 공유 실패:', error.message);
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

          {currentUserId === creatorUserId && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPost}>
              <Ionicons name="create-outline" size={28} color="white" />
            </TouchableOpacity>
          )}

          <View style={styles.topBar}>
            <View style={styles.profileTitleContainer}>
              {profileImageUrl && (
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

    <TouchableOpacity onPress={handleOpenLikeList}>
      <Text style={styles.count}>{likeCount}</Text>
    </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsCommentsVisible(true)}>
              <Ionicons name="chatbubble-outline" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.count}>{commentCount}</Text>

<TouchableOpacity onPress={onShare}>
              <Ionicons name="share-social-outline" size={32} color="white" />
            </TouchableOpacity>
            <View style={{ height: 20 }} />

            <TouchableOpacity onPress={() => setIsMoreMenuVisible(true)}>
              <Ionicons name="ellipsis-vertical" size={32} color="white" />
            </TouchableOpacity>

          </View>


        </View>
      </SafeAreaView>
<Modal visible={isMoreMenuVisible} transparent animationType="fade">
  <TouchableWithoutFeedback onPress={() => setIsMoreMenuVisible(false)}>
    <View style={styles.modalBackground} />
  </TouchableWithoutFeedback>

  <View style={styles.moreMenu}>
    {/* 링크 복사 버튼은 항상 보이게 */}
<TouchableOpacity
  onPress={() => {
    const shareUrl = `https://3.35.182.180:8080/post/${postId}`; // 실제 공유할 URL로 수정
    Clipboard.setString(shareUrl);
    setIsMoreMenuVisible(false);
    Alert.alert('링크 복사됨', '공유 링크가 클립보드에 복사되었습니다.');
  }}
>
  <Text style={styles.moreMenuItem}>링크 복사</Text>
</TouchableOpacity>

    {/* 삭제하기 버튼은 본인 글일 때만 보여줌 */}
    {currentUserId === creatorUserId && (
      <>
        <View style={{ height: 5 }} />
        <TouchableOpacity
          onPress={() => {
            setIsMoreMenuVisible(false);
            setTimeout(() => {
              confirmDeletePost();
            }, 300);
          }}
        >
          <Text style={styles.moreMenuItem}>삭제하기</Text>
        </TouchableOpacity>
      </>
    )}
  </View>
</Modal>


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
