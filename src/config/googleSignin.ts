import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';

export const configureGoogleSignin = () => {
  GoogleSignin.configure({
    iosClientId: IOS_CLIENT_ID, // ✅ 항상 명시적으로 설정!
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
};
