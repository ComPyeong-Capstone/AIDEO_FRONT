import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/shortsPlayer/CommentsScreenStyles';

export interface Reply {
  id: number;
  userId: number;
  username: string;
  content: string;
  liked: boolean;
}

export interface Comment {
  id: number;
  userId: number;
  username: string;
  content: string;
  liked: boolean;
  replies: Reply[];
}

interface Props {
  item: Comment;
  onToggleLike: (commentId: number, liked: boolean) => void;
  onDelete: (commentId: number) => void;
  onReplyTo: (commentId: number, username: string) => void;
  renderReply: (reply: Reply) => React.ReactNode; // ✅ JSX.Element → React.ReactNode
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
          <Text style={styles.username}>{item.username}</Text>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => onToggleLike(item.id, item.liked)}>
              <Text style={styles.likeButton}>{item.liked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
              <Text style={styles.likeButton}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.commentText}>{item.content}</Text>

        {item.replies.map(renderReply)}

        <TouchableOpacity onPress={() => onReplyTo(item.id, item.username)}>
          <Text style={styles.replyButton}>답글 달기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentItem;
