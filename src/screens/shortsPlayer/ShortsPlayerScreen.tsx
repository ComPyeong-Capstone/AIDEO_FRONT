import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Modal} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../../styles/shortsPlayer/ShortsPlayerScreenStyles';
import CommentsScreen from './CommentsScreen';

const ShortsPlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {title, creator} = route.params as {title: string; creator: string};

  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  return (
    <>
      {/* ✅ 메인 콘텐츠 */}
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          {/* 📌 영상 플레이스홀더 */}
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoText}>영상 재생 중</Text>
          </View>

          {/* 📌 좋아요 및 댓글 버튼 */}
          <View style={styles.sideMenu}>
            <TouchableOpacity>
              <Text style={styles.icon}>❤️</Text>
            </TouchableOpacity>
            <Text style={styles.count}>109</Text>

            <TouchableOpacity onPress={() => setIsCommentsVisible(true)}>
              <Text style={styles.icon}>💬</Text>
            </TouchableOpacity>
            <Text style={styles.count}>20</Text>
          </View>

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

      {/* ✅ 댓글 모달 (SafeAreaView 외부로 이동) */}
      <Modal
        visible={isCommentsVisible}
        animationType="slide"
        transparent={true}>
        <CommentsScreen onClose={() => setIsCommentsVisible(false)} />
      </Modal>
    </>
  );
};

export default ShortsPlayerScreen;
