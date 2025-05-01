// src/screens/auth/KakaoSignupScreen.tsx

import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {useUser} from '../../context/UserContext';
import {oauthApi} from '../../api/oauthApi';
import {saveAuthTokens} from '../../utils/storage';
import {getRandomProfileImageFileName} from '../../utils/defaultProfile';
import {userApi} from '../../api/userApi';
import {kakaoSignupStyles as styles} from '../../styles/auth/KakaoSignupScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'KakaoSignup'>;

const KakaoSignupScreen: React.FC<Props> = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const {setUser} = useUser();

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      Alert.alert('입력 오류', '닉네임을 입력해주세요.');
      return;
    }

    try {
      const {user, token} = await oauthApi.kakaoSignup(nickname.trim());

      if (!user || !token) {
        Alert.alert('회원가입 실패', '서버 응답이 올바르지 않습니다.');
        return;
      }

      await saveAuthTokens(token);

      if (!user.profileImage) {
        const randomImage = getRandomProfileImageFileName();
        await userApi.updateProfileImageByName(randomImage);
        user.profileImage = randomImage;
      }

      setUser(user);
      Alert.alert('가입 완료', `${user.userName}님 환영합니다!`);
      navigation.replace('Main');
    } catch (error) {
      console.error('카카오 닉네임 설정 실패 ❌', error);
      Alert.alert('회원가입 실패', '닉네임 설정 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임 설정</Text>

      <TextInput
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChangeText={setNickname}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KakaoSignupScreen;
