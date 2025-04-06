// src/utils/storage.ts

import {MMKV} from 'react-native-mmkv';
import EncryptedStorage from 'react-native-encrypted-storage';

const mmkv = new MMKV();

/**
 * accessToken과 refreshToken을 안전하게 저장
 */
export const saveAuthTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  // MMKV는 string, number, boolean만 저장 가능
  if (typeof accessToken !== 'string') {
    throw new Error(
      `accessToken은 문자열이어야 합니다. 현재 타입: ${typeof accessToken}`,
    );
  }

  if (typeof refreshToken !== 'string') {
    throw new Error(
      `refreshToken은 문자열이어야 합니다. 현재 타입: ${typeof refreshToken}`,
    );
  }

  mmkv.set('accessToken', accessToken);
  await EncryptedStorage.setItem('refreshToken', refreshToken);
};

/**
 * 저장된 accessToken을 가져옵니다
 */
export const getAccessToken = () => {
  const token = mmkv.getString('accessToken');
  return token ?? null;
};

/**
 * 저장된 refreshToken을 가져옵니다 (비동기)
 */
export const getRefreshToken = async () => {
  const token = await EncryptedStorage.getItem('refreshToken');
  return token ?? null;
};

/**
 * 저장된 모든 인증 토큰을 제거합니다
 */
export const clearAuthTokens = async () => {
  mmkv.delete('accessToken');
  await EncryptedStorage.removeItem('refreshToken');
};
