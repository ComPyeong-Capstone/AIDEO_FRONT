import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from '../../styles/bottomtab/2000-searchStyles';
import {scaleSize} from '../../styles/responsive';
import {getPostsByHashtag, getMyPosts, PostResponse} from '../../api/postApi';
import {useUser} from '../../context/UserContext';

// 🔧 네비게이션 타입 정의
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
  const {user} = useUser();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredPosts([]);
      return;
    }

    try {
      if (query.startsWith('#')) {
        // 해시태그 검색
        const hashtag = query.replace('#', '').trim();
        const posts = await getPostsByHashtag(hashtag);
        setFilteredPosts(posts);
      } else if (query === user?.userName) {
        // 본인 이름 검색 시 내 게시물 조회
        const posts = await getMyPosts();
        setFilteredPosts(posts);
      } else {
        // 사용자 이름 검색은 서버에서 지원 안 하므로 필터 불가 (서버 수정 필요)
        setFilteredPosts([]);
      }
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔍 검색창 */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={scaleSize(20)}
          color="#1F2C3D"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="해시태그(#태그) 또는 사용자명을 입력"
          placeholderTextColor="#1F2C3D"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* 🔍 검색 결과 */}
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.postId.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() =>
              navigation.navigate('ShortsPlayerScreen', {
                postId: item.postId,
                title: item.title,
                creator: item.userName ?? '알 수 없음',
                currentUserId: user?.userId ?? 0,
                creatorUserId: item.userId,
              })
            }>
            <Image
              source={{uri: item.thumbnail ?? item.videoURL}}
              style={styles.videoThumbnail}
              resizeMode="cover"
            />
            <View style={styles.videoInfoContainer}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <Text style={styles.videoCreator}>👤 {item.userName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
