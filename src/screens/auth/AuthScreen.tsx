import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import {authStyles} from '../../styles/auth/AuthScreenStyles';
import {userApi} from '../../api/userApi';
import {useUser} from '../../context/UserContext';
import {saveAuthTokens, getAccessToken} from '../../utils/storage';
import {RootStackParamList} from '../../types/navigation';
import {googleLoginApi} from '../../api/oauthApi'; // 필요한 경우 추가
import { oauthApi } from '../../api/oauthApi'; // POST /oauth/google with idToken
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CommonActions } from '@react-navigation/native';

const AuthScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useUser();
const [isGoogleLoggingIn, setIsGoogleLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    try {
      const { accesstoken, refreshToken, user } = await userApi.login(
        normalizedEmail,
        normalizedPassword,
      );

      if (!accesstoken || typeof accesstoken !== 'string') {
        throw new Error('accessToken이 유효하지 않습니다.');
      }

      await saveAuthTokens(accesstoken);

      setUser({
        ...user,
        token: accesstoken,
      });

      Alert.alert('로그인 성공', `${user.userName}님 환영합니다!`);
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message ?? error?.message;

      console.error('❌ 로그인 실패:', {
        status,
        message,
        error,
      });

      let errorMsg = '로그인 중 오류가 발생했습니다.';
      if (status === 403 || status === 404) {
        errorMsg = message?.includes('비밀번호')
          ? '비밀번호가 올바르지 않습니다.'
          : '존재하지 않는 이메일입니다.';
      } else if (!status && message?.includes('Network')) {
        errorMsg = '서버에 연결할 수 없습니다.';
      }

      Alert.alert('로그인 실패', errorMsg);
    }

  };
const handleGoogleLogin = async () => {
    if (isGoogleLoggingIn) return; // 중복 로그인 방지

      setIsGoogleLoggingIn(true); // 로그인 중 상태 표시
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();

    if (!userInfo || userInfo.type === 'cancelled') {
      Alert.alert('로그인 취소됨', 'Google 로그인이 취소되었습니다.');
      return;
    }

    const { accessToken: googleAccessToken, idToken } = await GoogleSignin.getTokens();

    if (!idToken || !googleAccessToken) {
      throw new Error('Google 토큰을 가져오지 못했습니다.');
    }

    console.log('🟢 idToken:', idToken);
    console.log('🟢 accessToken:', googleAccessToken);

    const response = await oauthApi.googleLogin(idToken, 'ios');

    if (response.needSignup) {
      navigation.navigate('GoogleSignup', { email: response.email });
    } else {
      const { accessToken, user } = response;
      await saveAuthTokens(accessToken);
      setUser({ ...user, token: accessToken, googleAccessToken });
      Alert.alert('로그인 성공', `${user.userName}님 환영합니다!`);
    }
  } catch (error) {
    console.error('❌ Google 로그인 실패:', error);
    Alert.alert('로그인 실패', 'Google 로그인 중 오류가 발생했습니다.');
  }finally {
            setIsGoogleLoggingIn(false); // 항상 초기화
          }
};


  return (
    <SafeAreaView style={authStyles.container}>
      <Text style={authStyles.title}>∇IDEO</Text>

      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={text => setEmail(text.replace(/\s/g, ''))}
        style={authStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={text => setPassword(text.replace(/\s/g, ''))}
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

      <View style={authStyles.orContainer}>
        <View style={authStyles.line} />
        <Text style={authStyles.orText}>or</Text>
        <View style={authStyles.line} />
      </View>

    <TouchableOpacity style={authStyles.googleButton} onPress={handleGoogleLogin}>
      <View style={authStyles.googleButtonContent}>
        <Icon name="google" size={20} color="#fff" style={authStyles.googleIcon} />
        <Text style={authStyles.buttonText}>Google로 로그인</Text>
      </View>
    </TouchableOpacity>


      <TouchableOpacity style={authStyles.kakaoButton}>
        <View style={authStyles.kakaoButtonContent}>
          <Icon
            name="comment"
            size={20}
            color="#000"
            style={authStyles.kakaoIcon}
          />
          <Text style={authStyles.kakaoButtonText}>Kakao로 로그인</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthScreen;
