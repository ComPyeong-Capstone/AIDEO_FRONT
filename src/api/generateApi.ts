// src/api/generateApi.ts
import axios from 'axios';
import {BASE_URL} from '../config/baseUrl';

interface GenerateMaterialRequest {
  title: string;
  duration: number;
}

interface GenerateMaterialResponse {
  subtitles: string[];
  image_urls: string[];
}

interface GeneratePartialVideoRequest {
  image_urls: string[];
  subtitles: string[];
}

interface GeneratePartialVideoResponse {
  video_urls: string[];
}

interface GenerateFinalVideoRequest {
  videos: string[];
  subtitles: string[];
  music_url: string;
}

interface GenerateFinalVideoResponse {
  final_video_url: string;
}

// ✅ 입력 프롬프트를 통한 사진 및 자막 생성
export const generateMaterial = async (
  payload: GenerateMaterialRequest,
): Promise<GenerateMaterialResponse> => {
  const response = await axios.post(`${BASE_URL}/generate/material`, payload);
  return response.data;
};

// ✅ 사진과 자막으로 부분 영상 생성
export const generatePartialVideo = async (
  payload: GeneratePartialVideoRequest,
): Promise<GeneratePartialVideoResponse> => {
  const response = await axios.post(
    `${BASE_URL}/generate/video/partial`,
    payload,
  );
  return response.data;
};

// ✅ 부분 영상 + 자막 + 음악으로 최종 영상 생성
export const generateFinalVideo = async (
  payload: GenerateFinalVideoRequest,
): Promise<GenerateFinalVideoResponse> => {
  const response = await axios.post(
    `${BASE_URL}/generate/video/final`,
    payload,
  );
  return response.data;
};
