import React, {useState, useEffect} from 'react';
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
import {styles} from '../../styles/bottomtab/2000-searchStyles';
import {scaleSize} from '../../styles/responsive';
import {getAllPosts, PostResponse} from '../../api/postApi';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allPosts, setAllPosts] = useState<PostResponse[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setAllPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error('📛 게시물 불러오기 실패:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPosts(allPosts);
      return;
    }

    const lower = query.toLowerCase();
    const filtered = allPosts.filter(
      post =>
        post.hashtags.some(tag => tag.toLowerCase().includes(lower)) ||
        post.title.toLowerCase().includes(lower), // 원하면 title 포함해도 됨
    );
    setFilteredPosts(filtered);
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
          placeholder="사용자명 또는 해시태그로 검색"
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
          <TouchableOpacity style={styles.videoItem}>
            <Image
              source={{uri: item.videoURL}}
              style={styles.videoThumbnail}
              resizeMode="cover"
            />
            <View style={styles.videoInfoContainer}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <Text style={styles.videoCreator}>👤 사용자 {item.userId}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
