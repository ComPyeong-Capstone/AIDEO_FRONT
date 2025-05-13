// src/screens/auth/KakaoLoginWebViewScreen.tsx

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {oauthApi} from '../../api/oauthApi';
import {useUser} from '../../context/UserContext';
import {saveAuthTokens} from '../../utils/storage';
import {getRandomProfileImageFileName} from '../../utils/defaultProfile';
import {userApi} from '../../api/userApi';

const KakaoLoginWebViewScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setUser} = useUser();
  const [loginHtml, setLoginHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoginHtml = async () => {
      try {
        const html = await oauthApi.getKakaoLoginHTML();
        setLoginHtml(html);
      } catch (e) {
        console.error('카카오 HTML 불러오기 실패 ❌', e);
      }
    };

    fetchLoginHtml();
  }, []);

  const handleNavigationStateChange = async (navState: any) => {
    const {url} = navState;

    try {
      const parsedUrl = new URL(url);
      const accessToken = parsedUrl.searchParams.get('accessToken');

      if (!accessToken) return;
      const response = await oauthApi.kakaoLogin(accessToken);

      if (response.needSignup) {
        navigation.navigate('KakaoSignup');
        return;
      }

      if (!response.token || !response.user) {
        throw new Error('유효하지 않은 응답');
      }

      await saveAuthTokens(response.token);

      if (!response.user.profileImage) {
        const randomImage = getRandomProfileImageFileName();
        await userApi.updateProfileImageByName(randomImage);
        response.user.profileImage = randomImage;
      }

      setUser(response.user);
      navigation.replace('Main');
    } catch (e) {
      console.error('카카오 로그인 실패 ❌', e);
    }
  };

  if (!loginHtml) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{html: loginHtml}}
      javaScriptEnabled
      domStorageEnabled
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

export default KakaoLoginWebViewScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
