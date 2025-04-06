import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signupStyles} from '../../styles/auth/SignupScreenStyles';
import {userApi} from '../../api/userApi';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleSignup = async () => {
    if (!userName || !email || !pw || !confirmPw) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }

    if (pw !== confirmPw) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await userApi.signup(userName, email, pw);
      Alert.alert('회원가입 성공 🎉', '이제 로그인 해주세요!');
      navigation.goBack();
    } catch (error: any) {
      console.error('회원가입 실패:', error);

      const message = error?.response?.data;

      let errorMsg = '회원가입 중 오류가 발생했습니다.';

      if (typeof message === 'string') {
        if (message.includes('이메일')) {
          errorMsg = '이미 존재하는 이메일입니다.';
        } else if (message.includes('닉네임')) {
          errorMsg = '이미 존재하는 닉네임입니다.';
        } else {
          errorMsg = message;
        }
      }

      Alert.alert('회원가입 실패', errorMsg);
    }
  };

  return (
    <SafeAreaView style={signupStyles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={signupStyles.backButton}>
        <Text style={signupStyles.backButtonText}>← 로그인으로</Text>
      </TouchableOpacity>

      <Text style={signupStyles.title}>회원가입</Text>

      <TextInput
        placeholder="닉네임"
        style={signupStyles.input}
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        placeholder="이메일"
        style={signupStyles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        style={signupStyles.input}
        value={pw}
        onChangeText={setPw}
        secureTextEntry
      />
      <TextInput
        placeholder="비밀번호 확인"
        style={signupStyles.input}
        value={confirmPw}
        onChangeText={setConfirmPw}
        secureTextEntry
      />

      <TouchableOpacity style={signupStyles.button} onPress={handleSignup}>
        <Text style={signupStyles.buttonText}>가입하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignupScreen;
