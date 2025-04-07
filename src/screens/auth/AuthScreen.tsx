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
import {useUser} from '../../context/UserContext';
import {getRandomProfileImageFileName} from '../../utils/defaultProfile';
import {saveAuthTokens} from '../../utils/storage';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

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
      const {accessToken, refreshToken, user} = await userApi.login(
        email,
        password,
      );

      await saveAuthTokens(accessToken, refreshToken);

      if (!user.profileImage) {
        const randomImage = getRandomProfileImageFileName();
        await userApi.updateProfileImage(randomImage);
        user.profileImage = randomImage;
      }

      setUser(user);
      Alert.alert('로그인 성공', `${user.userName}님 환영합니다!`);
    } catch (error: any) {
      const status = error?.response?.status ?? null;
      const data = error?.response?.data ?? null;
      const message = error?.message ?? '';
      const request = error?.request ?? null;

      // 👇 이모지를 분리하고 객체는 따로 출력
      console.error('로그인 실패 ❌');
      console.error('상세 로그:', {
        status,
        responseData: data,
        request,
        message,
        fullError: error,
      });

      let errorMsg = '로그인 중 오류가 발생했습니다.';

      const serverMessage =
        typeof data === 'string'
          ? data
          : typeof data?.message === 'string'
          ? data.message
          : null;

      if (status === 403) {
        if (serverMessage?.includes('비밀번호')) {
          errorMsg = '비밀번호가 올바르지 않습니다.';
        } else if (serverMessage?.includes('이메일')) {
          errorMsg = '존재하지 않는 이메일입니다.';
        } else {
          errorMsg = serverMessage || '접근이 거부되었습니다.';
        }
      } else if (status === 400 || status === 401) {
        errorMsg = serverMessage || '잘못된 요청입니다.';
      } else if (!status && message?.includes('Network')) {
        errorMsg = '서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.';
      } else if (serverMessage) {
        errorMsg = serverMessage;
      }

      Alert.alert(
        '로그인 실패',
        `${errorMsg}${status ? ` (code: ${status})` : ''}`,
      );
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
