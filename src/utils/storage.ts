// src/utils/storage.ts
import {MMKV} from 'react-native-mmkv';
import EncryptedStorage from 'react-native-encrypted-storage';

const mmkv = new MMKV();

export const saveAuthTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  mmkv.set('accessToken', accessToken);
  await EncryptedStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => mmkv.getString('accessToken');
export const getRefreshToken = async () =>
  await EncryptedStorage.getItem('refreshToken');

export const clearAuthTokens = async () => {
  mmkv.delete('accessToken');
  await EncryptedStorage.removeItem('refreshToken');
};
