import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/bottomtab/2000-searchStyles'; // ✅ 스타일 가져오기
import {scaleSize} from '../../styles/responsive'; // ✅ 반응형 크기 조정 함수 가져오기
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

// 📌 비디오 데이터 타입 정의
interface VideoItem {
  id: string;
  title: string;
  creator: string;
}

const videoData: VideoItem[] = [
  {id: '1', title: 'React Native 튜토리얼', creator: '사용자1'},
  {id: '2', title: 'JavaScript 기초', creator: '사용자2'},
  {id: '3', title: 'AI 활용법', creator: '사용자3'},
  {id: '4', title: 'UI/UX 디자인', creator: '사용자4'},
];

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredVideos, setFilteredVideos] = useState<VideoItem[]>(videoData);

  // 🔍 검색 기능
  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredVideos(videoData);
    } else {
      const filtered = videoData.filter(
        video =>
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.creator.toLowerCase().includes(query.toLowerCase()),
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
          size={scaleSize(20)} // ✅ width 인자 제거
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
