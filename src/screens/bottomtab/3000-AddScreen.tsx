import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from '../../styles/bottomtab/3000-addScreenStyles'; // ✅ 스타일 분리
import {scaleSize, scaleFont} from '../../styles/responsive'; // ✅ 반응형 함수 가져오기

// ✅ 네비게이션 타입 정의
type RootStackParamList = {
  PromptInputScreen: undefined;
  PhotoPromptScreen: undefined; // ✅ MyPhotoPrompt → PhotoPromptScreen으로 변경
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const AddScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>(); // ✅ 네비게이션 타입 적용

  return (
    <SafeAreaView style={styles.container}>
      {/* 버튼 컨테이너 */}
      <View style={styles.buttonWrapper}>
        {/* ✅ 쇼츠용 영상 버튼 (PromptInputScreen으로 이동) */}
        <TouchableOpacity
          style={[
            styles.button,
            {height: scaleSize(60), marginBottom: scaleSize(15)},
          ]}
          onPress={() => navigation.navigate('PromptInputScreen')} // ✅ 네비게이션 대상 수정
        >
          <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
            쇼츠용 영상
          </Text>
        </TouchableOpacity>

        {/* ✅ 내 사진 영상 버튼 (PhotoPromptScreen으로 이동) */}
        <TouchableOpacity
          style={[styles.button, {height: scaleSize(60)}]}
          onPress={() => navigation.navigate('PhotoPromptScreen')} // ✅ 수정된 네비게이션 대상
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
