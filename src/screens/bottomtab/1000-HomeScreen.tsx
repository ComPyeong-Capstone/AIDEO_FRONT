import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from '../../styles/bottomtab/1000-homeStyles';
import {scaleSize, scaleFont} from '../../styles/responsive';
import Feather from 'react-native-vector-icons/Feather';
import {getAllPosts, PostResponse} from '../../api/postApi';

type RootStackParamList = {
  ShortsPlayerScreen: {
    postId: number;
    title: string;
    creator: string;
    currentUserId: number;
    creatorUserId: number;
  };
  PostVideoScreen: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();

  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const itemWidth = (width - scaleSize(40)) / 2;
  const itemHeight = itemWidth * 0.75;
  const paddingBottomValue = scaleSize(40);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('게시물 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({item}: {item: PostResponse}) => (
    <TouchableOpacity
      style={[styles.videoContainer, {width: itemWidth}]}
      onPress={() =>
        navigation.navigate('ShortsPlayerScreen', {
          postId: item.postId,
          title: item.title,
          creator: item.userId.toString(), // 이름 있으면 교체
          currentUserId: item.userId, // Context에 있으면 교체
          creatorUserId: item.userId,
        })
      }>
      <Image
        source={{uri: 'https://via.placeholder.com/150'}} // thumbnail 나중에 반영 가능
        style={[
          styles.thumbnail,
          {height: itemHeight, borderRadius: scaleSize(8)},
        ]}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, {fontSize: scaleFont(16)}]}>
          {item.title}
        </Text>
        <View style={styles.creatorContainer}>
          <View
            style={[
              styles.profileCircle,
              {
                width: scaleSize(24),
                height: scaleSize(24),
                borderRadius: scaleSize(12),
                marginRight: scaleSize(8),
              },
            ]}
          />
          <Text style={[styles.creator, {fontSize: scaleFont(14)}]}>
            사용자 {item.userId}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 타이틀 + 업로드 버튼 */}
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>VideoAI</Text>
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={() => navigation.navigate('PostVideoScreen')}>
          <Feather name="upload" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#51BCB4" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.postId.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={[
            styles.contentContainer,
            {paddingBottom: paddingBottomValue},
          ]}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
