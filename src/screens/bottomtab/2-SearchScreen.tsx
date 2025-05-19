import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from '../../styles/bottomtab/2-searchStyles';
import {scaleSize} from '../../styles/responsive';
import {getPostsByHashtag, getMyPosts, PostResponse} from '../../api/postApi';
import {useUser} from '../../context/UserContext';

type RootStackParamList = {
  ShortsPlayerScreen: {
    postId: number;
    title: string;
    creator: string;
    currentUserId: number;
    creatorUserId: number;
  };
};

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostResponse[]>([]);
  const [sortOrder, setSortOrder] = useState<'latest' | 'likes' | 'oldest'>(
    'latest',
  );

  const {user} = useUser();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, sortOrder]);

  const handleSearch = async (query: string) => {
    const cleanQuery = query.trim().replace(/^#/, '');
    if (!cleanQuery) {
      setFilteredPosts([]);
      return;
    }

    try {
      let posts: PostResponse[] = [];

      if (query.startsWith('#') || query.length > 0) {
        posts = await getPostsByHashtag(cleanQuery);
      } else if (query === user?.userName) {
        posts = await getMyPosts();
      }

      const sorted = sortPosts(posts, sortOrder);
      setFilteredPosts(sorted);
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

  const sortPosts = (
    data: PostResponse[],
    order: 'latest' | 'likes' | 'oldest',
  ): PostResponse[] => {
    if (order === 'latest') {
      return [...data].sort((a, b) => b.postId - a.postId);
    } else if (order === 'oldest') {
      return [...data].sort((a, b) => a.postId - b.postId);
    } else {
      return [...data].sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
    }
  };

  const handleSortPress = () => {
    Alert.alert('정렬 기준 선택', '', [
      {
        text: '최신순',
        onPress: () => setSortOrder('latest'),
      },
      {
        text: '오래된순',
        onPress: () => setSortOrder('oldest'),
      },
      {
        text: '좋아요순',
        onPress: () => setSortOrder('likes'),
      },
      {text: '취소', style: 'cancel'},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔍 검색창 + 정렬버튼 */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={scaleSize(20)}
          color="#1F2C3D"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="해시태그 또는 사용자명을 입력"
          placeholderTextColor="#1F2C3D"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSortPress}>
          <Icon name="sort-ascending" size={scaleSize(24)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔍 검색 결과 */}
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.postId.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() =>
              navigation.navigate('ShortsPlayerScreen', {
                postId: item.postId,
                title: item.title,
                creator: item.author.userName ?? '알 수 없음',
                currentUserId: user?.userId ?? 0,
                creatorUserId: item.author.userId,
              })
            }>
            <Image
              source={{uri: item.thumbnailURL ?? item.videoURL}}
              style={styles.videoThumbnail}
              resizeMode="cover"
            />
            <View style={styles.videoInfoContainer}>
              <Text style={styles.videoTitle} numberOfLines={1}>
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
                <Text style={styles.videoCreator} numberOfLines={1}>
                  {item.author.userName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
