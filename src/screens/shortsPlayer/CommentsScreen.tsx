import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getComments, createComment, deleteComment} from '../../api/commentsApi';
import {likeComment, unlikeComment} from '../../api/commentLikeApi';
import {createNotification} from '../../api/notificationApi';
import {styles} from '../../styles/shortsPlayer/CommentsScreenStyles';
import CommentItem, {Comment, Reply} from '../../components/CommentItem';

interface Props {
  postId: number;
  currentUserId: number;
  creatorUserId: number;
  onClose: () => void;
}

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

      // 🔔 알림: 본인 글이 아닐 경우만
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
      // 댓글/대댓글 중 해당 id 찾기
      const all = comments.flatMap(c => [c, ...c.replies]);
      const target = all.find(c => c.id === commentId);
      const receiverId = target?.userId;

      if (!receiverId) return;

      // ✅ 본인 댓글은 좋아요 금지
      if (receiverId === currentUserId) {
        console.warn('자신의 댓글에는 좋아요를 누를 수 없습니다.');
        return;
      }

      if (liked) {
        await unlikeComment(postId, commentId);
      } else {
        await likeComment(postId, commentId);

        // 🔔 본인이 작성한 댓글이 아니라면 알림 생성
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

  const renderReply = (reply: Reply) => (
    <View key={reply.id} style={[styles.commentContainer, styles.replyItem]}>
      <View style={styles.profileCircle} />
      <View style={styles.flex1}>
        <View style={styles.commentHeader}>
          <Text style={styles.username}>{reply.username}</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleToggleLike(reply.id, reply.liked)}>
              <Text style={styles.likeButton}>{reply.liked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteComment(reply.id)}>
              <Text style={styles.likeButton}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.commentText}>{reply.content}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
        <View
          style={[styles.modalContainer, {paddingBottom: insets.bottom + 10}]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>댓글</Text>

          <FlatList
            data={comments}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <CommentItem
                item={item}
                onToggleLike={handleToggleLike}
                onDelete={handleDeleteComment}
                onReplyTo={handleReplyTo}
                renderReply={renderReply}
              />
            )}
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
              <Text style={styles.sendText}>📩</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentsScreen;
