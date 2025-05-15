import React, {useEffect, useState} from 'react';
import {getPostThumbnails} from '../../api/postApi';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {styles} from '../../styles/bottomtab/1-homeStyles';
import {getAllPosts, PostResponse} from '../../api/postApi';
import {useUser} from '../../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [thumbnails, setThumbnails] = useState<PostThumbnail[]>([]);
const [refreshing, setRefreshing] = useState(false);
const [sortOrder, setSortOrder] = useState<'latest' | 'likes' | 'oldest'>('latest');

const handleRefresh = async () => {
  setRefreshing(true);
  try {
    await fetchThumbnails();
  } catch (err) {
    console.error('새로고침 실패:', err);
  } finally {
    setRefreshing(false);
  }
};
const sortThumbnails = (data: PostThumbnail[], order: 'latest' | 'likes' | 'oldest') => {
  if (order === 'latest') {
    return [...data].sort((a, b) => b.postId - a.postId); // 최신순 (내림차순)
  } else if (order === 'oldest') {
    return [...data].sort((a, b) => a.postId - b.postId); // 오래된순 (오름차순)
  } else {
    return [...data].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)); // 좋아요순
  }
};

const handleSortPress = () => {
  Alert.alert('정렬 기준 선택', '', [
    {
      text: '최신순',
      onPress: () => {
        setSortOrder('latest');
        setThumbnails(prev => sortThumbnails(prev, 'latest'));
      },
    },
    {
      text: '오래된순',
      onPress: () => {
        setSortOrder('oldest');
        setThumbnails(prev => sortThumbnails(prev, 'oldest'));
      },
    },
    {
      text: '좋아요순',
      onPress: () => {
        setSortOrder('likes');
        setThumbnails(prev => sortThumbnails(prev, 'likes'));
      },
    },
    {text: '취소', style: 'cancel'},
  ]);
};


  const fetchThumbnails = async () => {
    try {
      const data = await getPostThumbnails();

      // 🔁 배열 순서 반전하여 최신 게시물이 위로 오도록
      const reversed = [...data].reverse();

      // 🔍 배열 상태 로그
      console.log(
        '뒤집은 썸네일 목록:',
        reversed.map(item => `id: ${item.postId}, title: ${item.title}`),
      );

setThumbnails(sortThumbnails(reversed, sortOrder));
    } catch (error) {
      console.error('썸네일 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);

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

  const renderItem = ({item}: {item: PostThumbnail}) => {
    return (
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
        <Image
          source={{
            uri:
              item.thumbnailURL ||
              'https://via.placeholder.com/200x300.png?text=No+Thumbnail',
          }}
          style={styles.thumbnailPlaceholder}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <View style={styles.creatorContainer}>
            <Image
              source={{
                uri:
                  item.author.profileImage ||
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>VideoAI</Text>
         <TouchableOpacity onPress={handleSortPress} style={{position: 'absolute', right: 20}}>
            <Icon name="sort-ascending" size={24}/>
          </TouchableOpacity>
      </View>


      {loading ? (
        <ActivityIndicator size="large" color="#51BCB4" />
      ) : (
      <FlatList
        data={thumbnails}
        renderItem={renderItem}
        keyExtractor={item => item.postId.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        refreshing={refreshing} // ✅ 추가
        onRefresh={handleRefresh} // ✅ 추가
      />

      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
