// src/config/baseUrl.ts
import {Platform} from 'react-native';

const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'
    : process.env.BASE_URL ?? 'http://localhost:8080';

export {BASE_URL};
