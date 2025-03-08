import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'; // ✅ SafeArea 적용
import Ionicons from 'react-native-vector-icons/Ionicons';

// 📌 반응형 크기 조절 함수
const {width} = Dimensions.get('window');
const scaleSize = size => (size / 375) * width; // 기준: iPhone 12 (375px)

const videoData = [
  {id: '1', title: 'React Native 튜토리얼', creator: '사용자1'},
  {id: '2', title: 'JavaScript 기초', creator: '사용자2'},
  {id: '3', title: 'AI 활용법', creator: '사용자3'},
  {id: '4', title: 'UI/UX 디자인', creator: '사용자4'},
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(videoData);

  // 🔍 검색 기능
  const handleSearch = query => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredVideos(videoData);
    } else {
      const filtered = videoData.filter(
        video => video.title.includes(query) || video.creator.includes(query),
      );
      setFilteredVideos(filtered);
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
          placeholder="검색"
          placeholderTextColor="#1F2C3D"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* 📌 검색 결과 리스트 */}
      <FlatList
        data={filteredVideos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.videoItem}>
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.videoCreator}>👤 {item.creator}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

// ✅ 스타일 (반응형 적용)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D', // ✅ HomeScreen과 동일한 배경색
    padding: scaleSize(10),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51BCB4',
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(8),
    marginBottom: scaleSize(15),
  },
  searchIcon: {
    marginRight: scaleSize(5),
  },
  searchInput: {
    flex: 1,
    color: '#1F2C3D',
    fontSize: scaleSize(16),
  },
  videoItem: {
    backgroundColor: '#0D1B2A', // ✅ 어두운 배경색 추가
    padding: scaleSize(15),
    borderRadius: scaleSize(10),
    marginBottom: scaleSize(10),
  },
  videoTitle: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    color: '#51BCB4', // ✅ 글자색 맞춤
  },
  videoCreator: {
    fontSize: scaleSize(14),
    color: '#A9BCD0',
    marginTop: scaleSize(5),
  },
});
