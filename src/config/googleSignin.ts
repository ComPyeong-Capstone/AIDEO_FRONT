import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';

// src/config/googleSignin.ts
export const configureGoogleSignin = () => {
  GoogleSignin.configure({
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID, // ✅ 반드시 필요
    offlineAccess: true,
  });
};
