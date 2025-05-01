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
import {saveAuthTokens} from '../../utils/storage';
import {getRandomProfileImageFileName} from '../../utils/defaultProfile';
import {RootStackParamList} from '../../types/navigation';

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
      const {token, user} = await userApi.login(email, password);
      await saveAuthTokens(token);

      if (!user.profileImage) {
        const randomImage = getRandomProfileImageFileName();
        await userApi.updateProfileImageByName(randomImage);
        user.profileImage = randomImage;
      }

      setUser(user);
      Alert.alert('로그인 성공', `${user.userName}님 환영합니다!`);
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message ?? error?.message;

      let errorMsg = '로그인 중 오류가 발생했습니다.';
      if (status === 403) {
        errorMsg = message.includes('비밀번호')
          ? '비밀번호가 올바르지 않습니다.'
          : '존재하지 않는 이메일입니다.';
      } else if (!status && message.includes('Network')) {
        errorMsg = '서버에 연결할 수 없습니다.';
      }

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

      <View style={authStyles.orContainer}>
        <View style={authStyles.line} />
        <Text style={authStyles.orText}>or</Text>
        <View style={authStyles.line} />
      </View>

      {/* Google 로그인 UI만 남김 */}
      <TouchableOpacity style={authStyles.googleButton}>
        <View style={authStyles.googleButtonContent}>
          <Icon
            name="google"
            size={20}
            color="#fff"
            style={authStyles.googleIcon}
          />
          <Text style={authStyles.buttonText}>Google로 로그인</Text>
        </View>
      </TouchableOpacity>

      {/* Kakao 로그인 UI만 남김 */}
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
