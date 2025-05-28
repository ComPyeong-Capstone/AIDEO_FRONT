import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  getComments,
  createComment,
  deleteComment,
  Comment,
} from '../../api/commentsApi';
import {likeComment, unlikeComment} from '../../api/commentLikeApi';
import {createNotification} from '../../api/notificationApi';
import {styles} from '../../styles/shortsPlayer/CommentsScreenStyles';
import CommentItem from '../../components/CommentItem';

interface Props {
  postId: number;
  currentUserId: number;
  creatorUserId: number;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const INITIAL_HEIGHT = SCREEN_HEIGHT * 0.5;
const MAX_HEIGHT = SCREEN_HEIGHT;

const CommentsScreen: React.FC<Props> = ({
  postId,
  currentUserId,
  creatorUserId,
  onClose,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{
    commentId: number;
    username: string;
  } | null>(null);

  const animatedHeight = useRef(new Animated.Value(INITIAL_HEIGHT)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();

  const loadComments = useCallback(async () => {
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleCreateComment = async () => {
    if (newComment.trim().length === 0) return;

    try {
      await createComment(postId, newComment, replyingTo?.commentId || null);

      if (currentUserId !== creatorUserId) {
        await createNotification({
          receiverId: creatorUserId,
          postId,
          type: 'COMMENT',
        });
      }

      setNewComment('');
      setReplyingTo(null);
      await loadComments();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(postId, commentId);
      await loadComments();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const handleToggleLike = async (commentId: number, liked: boolean) => {
    try {
      const all = comments.flatMap(c => [c, ...(c.replies ?? [])]);
      const target = all.find(c => c.commentId === commentId);
      const receiverId = target?.author.userId;

      if (!receiverId) return;

      if (receiverId === currentUserId) {
        console.warn('자신의 댓글에는 좋아요를 누를 수 없습니다.');
        return;
      }

      if (liked) {
        await unlikeComment(postId, commentId);
      } else {
        await likeComment(postId, commentId);
        await createNotification({
          receiverId,
          postId,
          type: 'COMMENT_LIKE',
        });
      }

      await loadComments();
    } catch (error) {
      console.error('댓글 좋아요 처리 실패:', error);
    }
  };

  const handleReplyTo = (commentId: number, username: string) => {
    setReplyingTo(
      replyingTo?.commentId === commentId ? null : {commentId, username},
    );
  };

  const renderReply = (reply: Comment) => (
    <View
      key={reply.commentId}
      style={[styles.commentContainer, styles.replyItem]}>
      <View style={styles.profileCircle} />
      <View style={styles.flex1}>
        <View style={styles.commentHeader}>
          <Text style={styles.username}>{reply.author.userName}</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                handleToggleLike(reply.commentId, reply.likedByMe)
              }>
              <Text style={styles.likeButton}>
                {reply.likedByMe ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteComment(reply.commentId)}>
              <Text style={styles.likeButton}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.commentText}>{reply.content}</Text>
      </View>
    </View>
  );

  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY > 5) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: MAX_HEIGHT,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.backdrop,
          {
            opacity: animatedOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          },
        ]}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              height: animatedHeight,
              paddingBottom: insets.bottom,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
            },
          ]}>
          <Text style={styles.headerText}>댓글</Text>

          <FlatList
            data={comments}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            keyExtractor={item => item.commentId.toString()}
            renderItem={({item}) => (
              <CommentItem
                item={item}
                onToggleLike={handleToggleLike}
                onDelete={handleDeleteComment}
                onReplyTo={handleReplyTo}
                renderReply={renderReply}
              />
            )}
            contentContainerStyle={{paddingBottom: 100}}
          />

          {replyingTo && (
            <View style={styles.replyingNotice}>
              <Text style={styles.replyingText}>
                @{replyingTo.username}에게 답글 중
              </Text>
              <TouchableOpacity onPress={() => setReplyingTo(null)}>
                <Text style={styles.cancelReply}>취소</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={
                  replyingTo ? '답글을 입력하세요' : '댓글을 입력하세요'
                }
                placeholderTextColor="#aaa"
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleCreateComment}>
                <Ionicons name="paper-plane-outline" size={26} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
};

export default CommentsScreen;
