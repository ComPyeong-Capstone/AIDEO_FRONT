import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// 📌 반응형 크기 조정 함수
const scaleSize = (size, width) => (size * width) / 375;
const scaleFont = (size, width) => (size * width) / 375;

const ProfileScreen = () => {
  const {width} = useWindowDimensions(); // ✅ 반응형 width 적용

  return (
    <SafeAreaView style={styles.container}>
      {/* 프로필 정보 섹션 */}
      <View style={[styles.profileSection, {padding: scaleSize(20, width)}]}>
        <Text style={[styles.username, {fontSize: scaleFont(20, width)}]}>
          아무개
        </Text>

        {/* 프로필 이미지 */}
        <Image
          source={{uri: 'https://via.placeholder.com/100'}} // 더미 프로필 이미지
          style={[
            styles.profileImage,
            {
              width: scaleSize(80, width),
              height: scaleSize(80, width),
              borderRadius: scaleSize(40, width),
            },
          ]}
        />

        {/* 게시물, 팔로워, 팔로잉 */}
        <View style={styles.statsContainer}>
          {['게시물', '팔로워', '팔로잉'].map((label, index) => (
            <View key={index} style={styles.statItem}>
              <Text
                style={[styles.statNumber, {fontSize: scaleFont(16, width)}]}>
                0
              </Text>
              <Text
                style={[styles.statLabel, {fontSize: scaleFont(12, width)}]}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* 프로필 편집 & 공유 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                paddingVertical: scaleSize(8, width),
                paddingHorizontal: scaleSize(15, width),
              },
            ]}>
            <Text style={[styles.buttonText, {fontSize: scaleFont(14, width)}]}>
              프로필 편집
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                paddingVertical: scaleSize(8, width),
                paddingHorizontal: scaleSize(15, width),
              },
            ]}>
            <Text style={[styles.buttonText, {fontSize: scaleFont(14, width)}]}>
              프로필 공유
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 히스토리 섹션 */}
      <Text
        style={[
          styles.historyTitle,
          {fontSize: scaleFont(16, width), marginTop: scaleSize(10, width)},
        ]}>
        히스토리
      </Text>

      {/* 히스토리 카드 */}
      <View style={styles.historyContainer}>
        {[1, 2].map(item => (
          <View
            key={item}
            style={[
              styles.historyCard,
              {width: (width - scaleSize(50, width)) / 2},
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C3D', // ✅ 배경색
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#273647', // ✅ 프로필 섹션 배경색
    borderRadius: 10,
    width: '90%',
  },
  username: {
    fontWeight: 'bold',
    color: '#51BCB4',
    marginBottom: 10,
  },
  profileImage: {
    marginBottom: 10,
    backgroundColor: '#aaa', // ✅ 더미 이미지 배경
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#51BCB4',
  },
  statLabel: {
    color: '#51BCB4',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#51BCB4',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#1F2C3D',
    fontWeight: 'bold',
  },
  historyTitle: {
    color: '#51BCB4',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  historyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
  },
  historyCard: {
    height: 100,
    backgroundColor: '#51BCB4',
    borderRadius: 10,
  },
});

export default ProfileScreen;
