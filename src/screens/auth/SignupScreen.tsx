// src/screens/auth/SignupScreen.tsx
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
import {generateRandomNickname} from '../../utils/nicknameGenerator';
import {getRandomProfileImageFileName} from '../../utils/defaultProfile'; // ✅ 수정된 부분

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleSignup = async () => {
    if (pw !== confirmPw) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!email || !pw) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const nickname = generateRandomNickname(); // ✅ 랜덤 닉네임 생성
    const profileImageFileName = getRandomProfileImageFileName(); // ✅ 랜덤 프로필 이미지 파일명

    try {
      // 1️⃣ 회원가입 요청
      const signupResponse = await userApi.signup(nickname, email, pw);

      // 2️⃣ 응답에서 userId 추출
      const userId = signupResponse.data?.userId;
      if (!userId) throw new Error('회원가입 후 userId를 받아오지 못했습니다.');

      // 3️⃣ 프로필 이미지 설정
      await userApi.updateProfileImage(userId, profileImageFileName);

      Alert.alert('회원가입 성공 🎉', '이제 로그인 해주세요!');
      navigation.goBack();
    } catch (error: any) {
      console.error('회원가입 실패:', error);
      const errorMsg =
        error?.response?.data || '회원가입 중 오류가 발생했습니다.';
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
