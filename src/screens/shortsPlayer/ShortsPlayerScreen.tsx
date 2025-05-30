import React, {useRef, useState, useEffect, useCallback} from 'react';
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
import CustomShareModal from '../shortsPlayer/CustomShareModal';
import Popover from 'react-native-popover-view';
import { Dimensions } from 'react-native';

const ShortsPlayerScreen: React.FC = () => {
      const touchableRef = useRef();
  const [visible, setVisible] = useState(false);
const [images, setImages] = useState<string[]>([]);
const [isImageViewerVisible, setImageViewerVisible] = useState(false);
const { width, height } = Dimensions.get('window');

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
const [shareModalVisible, setShareModalVisible] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState<any[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isLikedUsersVisible, setIsLikedUsersVisible] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
const fetchPostImages = async () => {
  try {
    const res = await fetch(`http://3.35.182.180:8080/posts/${postId}/images`);
    const data = await res.json();

    if (data.length === 0) {
      console.log('사용된 이미지 없음');
      return;
    }

    setImages(data); // 🔴 이 줄만 필요
  } catch (error) {
    console.error('이미지 불러오기 실패:', error);
  }
};


  // 핸들러
    const handleCopyLink = () => {
      const shareUrl = `https://3.35.182.180:8080/post/${postId}`;
      Clipboard.setString(shareUrl);
      Alert.alert('링크 복사됨', '공유 링크가 클립보드에 복사되었습니다.');
      setVisible(false);
    };

const handleDelete = () => {
  setVisible(false);
  setTimeout(confirmDeletePost, 300); // ✅ 바르게 참조
};

const handleCopyURL = () => {
  if (!videoURL) {
    Alert.alert('오류', '영상 URL이 없습니다.');
    return;
  }

  Clipboard.setString(videoURL);
  Alert.alert('복사됨', '영상 주소가 클립보드에 복사되었습니다.');
  setShareModalVisible(false);
};
const handleCopyAndShare = async () => {
  if (!videoURL) {
    Alert.alert('오류', '영상 URL이 없습니다.');
    return;
  }

  try {
    Clipboard.setString(videoURL);
    await Share.share({
      message: `[${title}]\n\n ${creator}님의 숏츠를 확인해보세요!\n👉 ${videoURL}`,
    });
    setShareModalVisible(false);
  } catch (error) {
    console.error('공유 실패:', error.message);
  }
};


const handleYouTubeUpload = () => {
  if (!videoURL) {
    Alert.alert('잠시만요', '영상이 아직 로드되지 않았어요.');
    return;
  }

  setShareModalVisible(false);
  navigation.navigate('YouTubeUploadScreen', {
    videoURI: videoURL,
    title,
    description: '',
  });
};

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
const onUploadToYouTube = () => {
  if (!videoURL) {
    Alert.alert('잠시만요', '영상이 아직 로드되지 않았어요.');
    return;
  }

  navigation.navigate('YouTubeUploadScreen', {
    videoURI: videoURL,
    title,
    description: '',
  });
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
  fetchPostImages();
}, []);


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
<TouchableOpacity
  onPress={() => setImageViewerVisible(true)}
  style={{
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  }}
>
  {images.slice(0, 3).map((uri, index) => (
    <Image
      key={index}
      source={{ uri }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        marginLeft: index === 0 ? 0 : -21,
        zIndex: 3 - index,
        backgroundColor: '#ccc',
      }}
    />
  ))}
  {images.length > 4 && (
    <View
   style={{
       marginLeft: 2,
       zIndex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     }}
    >
      <Text style={{ color: 'white', fontSize: 17 }}>
        +{images.length - 3}
      </Text>
    </View>
  )}
</TouchableOpacity>

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

<TouchableOpacity onPress={() => setShareModalVisible(true)}>
  <Ionicons name="share-social-outline" size={32} color="white" />
</TouchableOpacity>

            <View style={{ height: 20 }} />

     <TouchableOpacity ref={touchableRef} onPress={() => setVisible(true)}>
       <Ionicons name="ellipsis-vertical" size={32} color="white" />
     </TouchableOpacity>

          </View>


        </View>
      </SafeAreaView>



<Modal visible={visible} transparent animationType="fade">
  <TouchableWithoutFeedback onPress={() => setVisible(false)}>
    <View style={{ flex: 1, backgroundColor: 'transparent' }} />
  </TouchableWithoutFeedback>

  <View
    style={{
      position: 'absolute',
      bottom:50, // 하단으로부터 거리
      right: 20,   // 오른쪽으로부터 거리
      backgroundColor: 'white',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      width: 120, // 너비 조절
        alignItems: 'center', // ✅ 내용 가운데 정렬
    }}
  >
    <TouchableOpacity onPress={handleCopyLink} style={{ paddingVertical: 10 }}>
      <Text style={{ fontSize: 16 }}>링크 복사</Text>
    </TouchableOpacity>

 {currentUserId === creatorUserId && (
   <View>
     <TouchableOpacity style={{ paddingVertical: 10 }} onPress={handleEditPost}>
          <Text style={{ fontSize: 16 }}>수정하기</Text>
        </TouchableOpacity>
     <TouchableOpacity onPress={handleDelete} style={{ paddingVertical: 10 }}>
       <Text style={{ fontSize: 16, color: 'red' }}>삭제하기</Text>
     </TouchableOpacity>

   </View>
 )}

  </View>
</Modal>

<Modal visible={isImageViewerVisible} transparent animationType="slide">
  <View style={{ flex: 1 }}>
 <FlatList
   data={images}
   horizontal
   pagingEnabled
   showsHorizontalScrollIndicator={false}
   keyExtractor={(item, index) => index.toString()}
   renderItem={({ item }) => (
     <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
   <Image
     source={{ uri: item }}
     style={{ width: width * 0.95, height: height * 0.95, resizeMode: 'contain' }}
     onLoadStart={() => console.log('이미지 로딩 시작')}
     onLoadEnd={() => console.log('이미지 로딩 완료')}
     onError={(e) => console.warn('이미지 로드 실패:', e.nativeEvent.error)}
   />
 <TouchableOpacity
      onPress={() => setImageViewerVisible(false)}
      style={{ position: 'absolute', top: 60, right: 10, zIndex: 1 }}
    >
      <Ionicons name="close" size={30} color="white" />
    </TouchableOpacity>
     </View>
   )}
 />

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

 <CustomShareModal
   visible={shareModalVisible}
   onClose={() => setShareModalVisible(false)}
   onUploadToYouTube={handleYouTubeUpload}
   onCopyLink={handleCopyURL}
   videoURL={videoURL} // ✅ 여기가 null이면 안 됩니다!
   title={title}
   creator={creator}
 />


    </>
  );
};

export default ShortsPlayerScreen;
