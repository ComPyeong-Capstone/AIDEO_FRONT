import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../styles/bottomtab/5000-profileStyles';
import {useUser} from '../../context/UserContext';
import {defaultProfileImages} from '../../utils/defaultProfile';
import {userApi} from '../../api/userApi';
import {getMyPosts, PostResponse} from '../../api/postApi';
import {scaleFont} from '../../styles/responsive';

const getProfileImageByName = (fileName: string | null | undefined) => {
  const match = fileName?.match(/profile(\d+)\.jpg/);
  if (match) {
    const index = parseInt(match[1], 10) - 1;
    return defaultProfileImages[index] ?? defaultProfileImages[0];
  }
  return defaultProfileImages[0];
};

const ProfileScreen: React.FC = () => {
  const {user, setUser} = useUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [newNickname, setNewNickname] = useState(user?.userName ?? '');
  const [selectedImage, setSelectedImage] = useState(user?.profileImage ?? '');
  const [userPosts, setUserPosts] = useState<PostResponse[]>([]);

  const handleSaveProfile = async () => {
    if (!user) {
      return;
    }

    const nicknameUnchanged = newNickname === user.userName;
    const imageUnchanged = selectedImage === user.profileImage;

    if (nicknameUnchanged && imageUnchanged) {
      Alert.alert('알림', '변경된 내용이 없습니다.');
      return;
    }

    try {
      if (!nicknameUnchanged) {
        await userApi.updateNickname(newNickname);
      }
      if (!imageUnchanged) {
        await userApi.updateProfileImage(selectedImage);
      }

      setUser({
        ...user,
        userName: newNickname,
        profileImage: selectedImage,
      });

      Alert.alert('성공', '프로필이 변경되었습니다.');
      setModalVisible(false);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || '프로필 수정에 실패했습니다.';

      Alert.alert('오류', errorMessage);
    }
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠어요?', [
      {text: '취소', style: 'cancel'},
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: () => setUser(null),
      },
    ]);
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const posts = await getMyPosts();
        setUserPosts(posts);
      } catch (error) {
        console.error('❌ 사용자 쇼츠 불러오기 실패:', error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 프로필 영역 */}
      <View style={styles.profileSection}>
        <View style={styles.profileCenteredRow}>
          <Image
            source={getProfileImageByName(user?.profileImage)}
            style={styles.profileImage}
          />
          <Text style={[styles.username, {fontSize: scaleFont(20)}]}>
            {user?.userName ?? ''}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.longButton}
            onPress={() => setModalVisible(true)}>
            <Text style={[styles.buttonText, {fontSize: scaleFont(14)}]}>
              프로필 편집
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 히스토리 */}
      <View style={styles.historyHeader}>
        <View style={styles.historyHeaderRow}>
          <Text style={[styles.historyTitle, styles.historyTitleLarge]}>
            히스토리
          </Text>
          <Text style={styles.postCountText}>{userPosts.length}</Text>
        </View>
      </View>

      {/* 모달 - 프로필 편집 */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>프로필 편집</Text>

            <TextInput
              value={newNickname}
              onChangeText={setNewNickname}
              style={styles.input}
              placeholder="닉네임 입력"
            />

            <FlatList
              data={defaultProfileImages}
              horizontal
              keyExtractor={(_, i) => `profile${i}`}
              renderItem={({item, index}) => {
                const profileName = `profile${index + 1}.jpg`;
                const isSelected = selectedImage === profileName;

                return (
                  <TouchableOpacity
                    onPress={() => setSelectedImage(profileName)}>
                    <Image
                      source={item}
                      style={[
                        styles.modalImage,
                        isSelected && styles.selectedImageBorder,
                      ]}
                    />
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={handleSaveProfile}>
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 로그아웃 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
