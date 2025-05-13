import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/shortsPlayer/CommentsScreenStyles';
import {Comment} from '../api/commentsApi'; // ✅ 통일된 타입 사용

interface Props {
  item: Comment;
  onToggleLike: (commentId: number, liked: boolean) => void;
  onDelete: (commentId: number) => void;
  onReplyTo: (commentId: number, username: string) => void;
  renderReply: (reply: Comment) => React.ReactNode; // ✅ 대댓글도 Comment 타입 사용
}

const CommentItem: React.FC<Props> = ({
  item,
  onToggleLike,
  onDelete,
  onReplyTo,
  renderReply,
}) => {
  return (
    <View style={[styles.commentContainer, styles.commentItem]}>
      <View style={styles.profileCircle} />
      <View style={styles.flex1}>
        <View style={styles.commentHeader}>
          <Text style={styles.username}>{item.author.userName}</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => onToggleLike(item.commentId, item.likedByMe)}>
              <Text style={styles.likeButton}>
                {item.likedByMe ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.commentId)}>
              <Text style={styles.likeButton}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.commentText}>{item.content}</Text>

        {item.replies?.map(renderReply)}

        <TouchableOpacity
          onPress={() => onReplyTo(item.commentId, item.author.userName)}>
          <Text style={styles.replyButton}>답글 달기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentItem;
