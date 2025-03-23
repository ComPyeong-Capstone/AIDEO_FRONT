// src/screens/auth/AuthScreen.tsx
import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {authStyles} from '../../styles/auth/AuthScreenStyles';
import {userApi} from '../../api/userApi';
import {useUser} from '../../context/UserContext'; // ✅ 커스텀 훅 사용

// ✅ Main 포함된 루트 네비게이션 타입 정의
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

interface User {
  userId: number;
  userName: string;
  email: string;
  profileImage: string | null;
}

const AuthScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await userApi.login(email, password);
      const user: User = response.data;

      console.log('로그인 성공:', user);
      Alert.alert('로그인 성공', `${user.userName}님 환영합니다!`);

      setUser(user); // ✅ 전역 저장
      navigation.replace('Main'); // ✅ 메인탭 이동
    } catch (error: any) {
      console.error('로그인 실패:', error);
      const errorMsg =
        error?.response?.data || '로그인 중 오류가 발생했습니다.';
      Alert.alert('로그인 실패', errorMsg);
    }
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <Text style={authStyles.title}>로그인</Text>

      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={authStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        style={authStyles.input}
        secureTextEntry
      />

      <TouchableOpacity style={authStyles.button} onPress={handleLogin}>
        <Text style={authStyles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={authStyles.switchText}>
          계정이 없으신가요? 회원가입 하기
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthScreen;
