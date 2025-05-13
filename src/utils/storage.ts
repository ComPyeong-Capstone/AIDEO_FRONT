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

  if (refreshToken !== undefined) {
    if (typeof refreshToken !== 'string') {
      throw new Error(
        `refreshToken은 문자열이어야 합니다. 현재 타입: ${typeof refreshToken}`,
      );
    }
    await EncryptedStorage.setItem('refreshToken', refreshToken);
  }
};

export const getAccessToken = () => {
  return mmkv.getString('accessToken') ?? null;
};

export const getRefreshToken = async () => {
  return (await EncryptedStorage.getItem('refreshToken')) ?? null;
};

export const clearAuthTokens = async () => {
  mmkv.delete('accessToken');
  await EncryptedStorage.removeItem('refreshToken');
};
