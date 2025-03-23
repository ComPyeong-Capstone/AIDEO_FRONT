import React, {useState} from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context'; // ✅ 추가
import {styles} from '../../styles/shortsPlayer/CommentsScreenStyles';

interface Comment {
  id: string;
  username: string;
  content: string;
}

const CommentsScreen: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [comments, setComments] = useState<Comment[]>([
    {id: '1', username: '사용자1', content: '멋진 영상이네요!'},
    {id: '2', username: '사용자2', content: '잘 보고 갑니다.'},
  ]);
  const [newComment, setNewComment] = useState('');

  const insets = useSafeAreaInsets(); // ✅ 안전 영역 정보 사용

  const addComment = () => {
    if (newComment.trim().length > 0) {
      setComments(prevComments => [
        ...prevComments,
        {id: Date.now().toString(), username: '나', content: newComment},
      ]);
      setNewComment('');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
        {/* ✅ 안전 패딩 추가된 modalContainer */}
        <View
          style={[styles.modalContainer, {paddingBottom: insets.bottom + 10}]}>
          {/* 📌 우측 상단 X 버튼 */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              console.log('닫기 버튼 클릭됨');
              onClose();
            }}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>

          {/* 📌 댓글 목록 */}
          <Text style={styles.headerText}>댓글</Text>
          <FlatList
            data={comments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.commentItem}>
                <View style={styles.profileCircle} />
                <View>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.commentText}>{item.content}</Text>
                </View>
              </View>
            )}
          />

          {/* 📌 댓글 입력창 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="댓글을 입력하세요"
              placeholderTextColor="#aaa"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.sendButton} onPress={addComment}>
              <Text style={styles.sendText}>📩</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentsScreen;
