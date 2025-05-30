import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID,ANDROID_CLIENT_ID } from '@env';

// src/config/googleSignin.ts
export const configureGoogleSignin = () => {
  GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube.upload'],

    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
      //androidClientId: ANDROID_CLIENT_ID,

    offlineAccess: true,
  });
};
