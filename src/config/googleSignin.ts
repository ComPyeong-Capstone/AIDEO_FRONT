// src/config/googleSignin.ts
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const configureGoogleSignin = ({
  iosClientId,
  webClientId,
}: {
  iosClientId: string;
  webClientId: string;
}) => {
  console.log('🧪 전달받은 Client ID:', iosClientId, webClientId); // 디버깅용

  GoogleSignin.configure({
    iosClientId,
    webClientId,
    offlineAccess: true,
  });
};
