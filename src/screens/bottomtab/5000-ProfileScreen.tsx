import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../styles/bottomtab/5000-profileStyles'; // ✅ 스타일 파일 분리
import {scaleFont} from '../../styles/responsive'; // ✅ scaleSize 제거

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 프로필 정보 섹션 */}
      <View style={styles.profileSection}>
        <Text style={[styles.username, {fontSize: scaleFont(20)}]}>아무개</Text>

        {/* 프로필 이미지 */}
        <Image
          source={{uri: 'https://via.placeholder.com/100'}} // 더미 프로필 이미지
          style={styles.profileImage}
        />

        {/* 게시물, 팔로워, 팔로잉 */}
        <View style={styles.statsContainer}>
          {['게시물', '팔로워', '팔로잉'].map((label, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={[styles.statNumber, {fontSize: scaleFont(16)}]}>
                0
              </Text>
              <Text style={[styles.statLabel, {fontSize: scaleFont(12)}]}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* 프로필 편집 & 공유 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttonText, {fontSize: scaleFont(14)}]}>
              프로필 편집
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttonText, {fontSize: scaleFont(14)}]}>
              프로필 공유
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 히스토리 섹션 */}
      <Text style={[styles.historyTitle, {fontSize: scaleFont(16)}]}>
        히스토리
      </Text>

      {/* 히스토리 카드 */}
      <View style={styles.historyContainer}>
        {[1, 2].map(item => (
          <View key={item} style={styles.historyCard} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
