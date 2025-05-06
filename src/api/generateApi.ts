// src/api/generateApi.ts
import {videoAxiosInstance} from './axiosInstance';

export interface GenerateMaterialRequest {
  title: string;
  duration: number;
}

export interface GenerateMaterialResponse {
  subtitles: string[];
  image_urls: string[];
}

export interface GeneratePartialVideoRequest {
  image_urls: string[];
  subtitles: string[];
}

export interface GeneratePartialVideoResponse {
  video_urls: string[];
}

export interface GenerateFinalVideoRequest {
  videos: string[];
  subtitles: string[];
  music_url: string;
  font_path: string;
  font_effect: string;
  font_color: string;
  subtitle_y_positiong: number;
}

export interface GenerateFinalVideoResponse {
  final_video_url: string;
}

// ✅ 입력 프롬프트를 통한 사진 및 자막 생성
export const generateMaterial = async (
  payload: GenerateMaterialRequest,
): Promise<GenerateMaterialResponse> => {
  const response = await videoAxiosInstance.post('/generate/material', payload);
  return response.data;
};

// ✅ 사진과 자막으로 부분 영상 생성
export const generatePartialVideo = async (
  payload: GeneratePartialVideoRequest,
): Promise<GeneratePartialVideoResponse> => {
  const response = await videoAxiosInstance.post(
    '/generate/video/partial',
    payload,
  );
  return response.data;
};

// ✅ 부분 영상 + 자막 + 음악으로 최종 영상 생성
export const generateFinalVideo = async (
  payload: GenerateFinalVideoRequest,
): Promise<GenerateFinalVideoResponse> => {
  const response = await videoAxiosInstance.post(
    '/generate/video/final',
    payload,
  );
  return response.data;
};
