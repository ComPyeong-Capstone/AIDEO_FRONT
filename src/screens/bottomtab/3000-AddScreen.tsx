import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from '../../styles/bottomtab/3000-addScreenStyles';
import {scaleSize, scaleFont} from '../../styles/responsive';

// ✅ 네비게이션 타입 정의 (AppNavigator 내 Stack.Screen에 맞게 수정)
type RootStackParamList = {
  ShortsStack: undefined; // ✅ ShortsNavigator로 이동
  PhotoStack: undefined; // ✅ PhotoNavigator로 이동
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const AddScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>(); // ✅ 네비게이션 타입 적용

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonWrapper}>
        {/* ✅ 쇼츠 영상 버튼 (ShortsStack으로 이동) */}
        <TouchableOpacity
          style={[
            styles.button,
            {height: scaleSize(60), marginBottom: scaleSize(15)},
          ]}
          onPress={() => navigation.navigate('ShortsStack')} // ✅ ShortsNavigator로 이동
        >
          <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
            쇼츠용 영상
          </Text>
        </TouchableOpacity>

        {/* ✅ 내 사진 영상 버튼 (PhotoStack으로 이동) */}
        <TouchableOpacity
          style={[styles.button, {height: scaleSize(60)}]}
          onPress={() => navigation.navigate('PhotoStack')} // ✅ PhotoNavigator로 이동
        >
          <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
            내 사진 영상
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;
