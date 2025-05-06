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
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {styles} from '../../styles/bottomtab/1000-homeStyles';
import {getAllPosts, PostResponse} from '../../api/postApi';
import {useUser} from '../../context/UserContext';

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
  const {user} = useUser();
  const insets = useSafeAreaInsets();

  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);

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
      style={[styles.videoContainer, {width: (width - 40) / 2}]}
      onPress={() =>
        navigation.navigate('ShortsPlayerScreen', {
          postId: item.postId,
          title: item.title,
          creator: item.author.userName,
          currentUserId: user?.userId ?? 0,
          creatorUserId: item.author.userId,
        })
      }>
      <View style={styles.thumbnailPlaceholder} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.creatorContainer}>
          <Image
            source={{
              uri:
                item.author.profileImage ??
                'https://via.placeholder.com/100.png?text=User',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.creator}>
            {item.author.userName ?? `사용자 ${item.author.userId}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {paddingBottom: 0}]}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>VideoAI</Text>
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
          contentContainerStyle={{
            paddingBottom: 0, // ✅ 핵심 변경
            paddingHorizontal: 15,
          }}
        />
      )}
    </SafeAreaView>
  );

};

export default HomeScreen;
