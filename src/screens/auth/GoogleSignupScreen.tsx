import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { oauthApi } from '../../api/oauthApi';
import { saveAuthTokens } from '../../utils/storage';
import { useUser } from '../../context/UserContext';

type Props = NativeStackScreenProps<RootStackParamList, 'GoogleSignup'>;

const GoogleSignupScreen: React.FC<Props> = ({ route, navigation }) => {
  const { email } = route.params;
  const [nickname, setNickname] = useState('');
  const { setUser } = useUser();

  const handleSubmit = async () => {
    if (!nickname) {
      Alert.alert('입력 오류', '닉네임을 입력해주세요.');
      return;
    }

    try {
const response = await oauthApi.googleSignup(email, nickname);
      if (!response || !response.token || !response.user) {
        throw new Error('회원가입 실패');
      }

      await saveAuthTokens(response.token);
      setUser({ ...response.user, token: response.token });

      Alert.alert('가입 완료', `${response.user.userName}님 환영합니다!`);
      navigation.replace('Main');
    } catch (error) {
      console.error('닉네임 설정 실패:', error);
      Alert.alert('회원가입 실패', '닉네임 설정 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        닉네임을 설정해주세요
      </Text>
      <TextInput
        placeholder="닉네임 입력"
        value={nickname}
        onChangeText={setNickname}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
          borderRadius: 5,
        }}
      />
      <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#000', padding: 15 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignupScreen;
