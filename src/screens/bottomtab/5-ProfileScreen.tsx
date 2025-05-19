import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {styles} from '../../styles/bottomtab/5-profileStyles';
import {useUser} from '../../context/UserContext';
import {defaultProfileImages} from '../../utils/defaultProfile';
import {userApi} from '../../api/userApi';
import {getMyPosts, PostResponse} from '../../api/postApi';

import {AppStackParamList} from '../../types/navigation';

const getProfileImageByName = (fileName: string | null | undefined) => {
  const match = fileName?.match(/profile(\d+)\.jpg/);
  if (match) {
    const index = parseInt(match[1], 10) - 1;
    return defaultProfileImages[index] ?? defaultProfileImages[0];
  }
  return defaultProfileImages[0];
};

type NavigationProps = StackNavigationProp<
  AppStackParamList,
  'ShortsPlayerScreen'
>;

const ProfileScreen: React.FC = () => {
  const {user, setUser} = useUser();
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();

  const [modalVisible, setModalVisible] = useState(false);
  const [newNickname, setNewNickname] = useState(user?.userName ?? '');
  const [selectedImage, setSelectedImage] = useState(user?.profileImage ?? '');
  const [userPosts, setUserPosts] = useState<PostResponse[]>([]);

  const itemWidth = (width - 40) / 2;
  const itemHeight = itemWidth;

  const handleSaveProfile = async () => {
    if (!user) return;
    const nicknameUnchanged = newNickname === user.userName;
    const imageUnchanged = selectedImage === user.profileImage;
    if (nicknameUnchanged && imageUnchanged) {
      Alert.alert('알림', '변경된 내용이 없습니다.');
      return;
    }
    try {
      if (!nicknameUnchanged) await userApi.updateNickname(newNickname);
      if (!imageUnchanged)
        await userApi.updateProfileImageByName(selectedImage);
      setUser({...user, userName: newNickname, profileImage: selectedImage});
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
      {text: '로그아웃', style: 'destructive', onPress: () => setUser(null)},
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

  const renderItem = ({item}: {item: PostResponse}) => (
    <TouchableOpacity
      style={[styles.videoContainer, {width: itemWidth, height: itemHeight}]}
      onPress={() =>
        navigation.navigate('ShortsPlayerScreen', {
          postId: item.postId,
          title: item.title,
          creator: item.author.userName,
          currentUserId: user?.userId ?? 0,
          creatorUserId: item.author.userId,
          showComments: false,
        })
      }>
  <Image
    source={{ uri: item.thumbnailURL || 'https://via.placeholder.com/200x300.png?text=No+Thumbnail' }}
    style={styles.thumbnailImage}
    resizeMode="cover"
  />


      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={styles.profileCenteredRow}>
            <Image
              source={getProfileImageByName(user?.profileImage)}
              style={styles.profileImage}
            />
            <Text style={styles.username}>{user?.userName ?? ''}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.longButton}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>프로필 편집</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.historyHeader}>
          <View style={styles.historyHeaderRow}>
            <Text style={styles.historyTitle}>히스토리</Text>
            <Text style={styles.postCountText}>{userPosts.length}</Text>
          </View>
        </View>

        <FlatList
          data={userPosts}
          renderItem={renderItem}
          keyExtractor={item => item.postId.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.postsContainer}
        />
      </ScrollView>

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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.profileImageRow}>
                {defaultProfileImages.map((item, index) => {
                  const profileName = `profile${index + 1}.jpg`;
                  const isSelected = selectedImage === profileName;
                  return (
                    <TouchableOpacity
                      key={index}
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
                })}
              </View>
            </ScrollView>

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

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
