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
import {styles} from '../../styles/shortsPlayer/CommentsScreenStyles';

interface Reply {
  id: number;
  username: string;
  content: string;
  liked: boolean;
}

interface Comment {
  id: number;
  username: string;
  content: string;
  liked: boolean;
  replies: Reply[];
}

interface Props {
  postId: number;
  currentUserId: number;
  onClose: () => void;
}

const CommentsScreen: React.FC<Props> = ({postId, currentUserId, onClose}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{
    commentId: number;
    username: string;
  } | null>(null);

  const insets = useSafeAreaInsets();

  const loadComments = useCallback(async () => {
    try {
      const data = await getComments(postId, currentUserId);
      setComments(data);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  }, [postId, currentUserId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleCreateComment = async () => {
    if (newComment.trim().length === 0) {
      return;
    }

    try {
      await createComment(
        postId,
        currentUserId,
        newComment,
        replyingTo ? replyingTo.commentId : null,
      );
      setNewComment('');
      setReplyingTo(null);
      await loadComments();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(postId, commentId, currentUserId);
      await loadComments();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const handleToggleLike = async (commentId: number, liked: boolean) => {
    try {
      liked
        ? await unlikeComment(postId, commentId, currentUserId)
        : await likeComment(postId, commentId, currentUserId);
      await loadComments();
    } catch (error) {
      console.error('댓글 좋아요 처리 실패:', error);
    }
  };

  const renderReply = (reply: Reply) => (
    <View key={reply.id} style={styles.replyItem}>
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              <View style={styles.commentItem}>
                <View style={styles.profileCircle} />
                <View style={styles.flex1}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.username}>{item.username}</Text>
                    <View style={styles.row}>
                      <TouchableOpacity
                        onPress={() => handleToggleLike(item.id, item.liked)}>
                        <Text style={styles.likeButton}>
                          {item.liked ? '❤️' : '🤍'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteComment(item.id)}>
                        <Text style={styles.likeButton}>🗑</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.commentText}>{item.content}</Text>

                  {item.replies.map(renderReply)}

                  <TouchableOpacity
                    onPress={() =>
                      setReplyingTo(
                        replyingTo?.commentId === item.id
                          ? null
                          : {commentId: item.id, username: item.username},
                      )
                    }>
                    <Text style={styles.replyButton}>답글 달기</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
