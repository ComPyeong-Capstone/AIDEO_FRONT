import {MMKV} from 'react-native-mmkv';
import EncryptedStorage from 'react-native-encrypted-storage';

const mmkv = new MMKV();
export const saveAuthTokens = async (
  accessToken: string,
  refreshToken?: string,
) => {
  if (typeof accessToken !== 'string') {
    throw new Error(
      `accessToken은 문자열이어야 합니다. 현재 타입: ${typeof accessToken}`,
    );
  }

  mmkv.set('accessToken', accessToken);

  if (refreshToken !== undefined && typeof refreshToken === 'string') {
    try {
      await EncryptedStorage.setItem('refreshToken', refreshToken);
    } catch (e) {
      console.warn('🔴 refreshToken 저장 실패:', e);
    }
  }
};
export const getAccessToken = () => {
  return mmkv.getString('accessToken') ?? null;
};

export const getRefreshToken = async () => {
  return (await EncryptedStorage.getItem('refreshToken')) ?? null;
};

export const clearAuthTokens = async () => {
  try {
    mmkv.delete('accessToken');
    await EncryptedStorage.removeItem('refreshToken');
  } catch (error) {
    console.warn('🔴 refreshToken 제거 중 오류:', error);
  }
};
