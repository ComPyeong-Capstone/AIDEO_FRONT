import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';

export const configureGoogleSignin = () => {
GoogleSignin.configure({
  webClientId: '구글 클라우드 콘솔에서 발급받은 웹 클라이언트 ID',
  offlineAccess: true,
});
};
