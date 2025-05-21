import {videoAxiosInstance} from './axiosInstance';

// ✅ Request / Response 타입 정의

export interface GenerateMaterialRequest {
  text: string;
  number: number;
}

export interface GenerateMaterialResponse {
  subtitles: string[];
  image_urls: string[];
}

export interface RegenerateImageRequest {
  text: string;
  number: number;
}

export interface RegenerateImageResponse {
  image_url: string;
}

export interface GeneratePartialVideoRequest {
  images: string[];
  subtitles: string[];
}

export interface GeneratePartialVideoResponse {
  video_urls: string[];
}

export interface RegenerateSinglePartialVideoRequest {
  image: string;
  subtitle: string;
  number: number;
}

export interface RegenerateSinglePartialVideoResponse {
  video_url: string;
}

export interface GenerateFinalVideoRequest {
  videos: string[];
  subtitles: string[];
  music_url: string;
  font_path: string;
  font_effect: string;
  font_color: string;
  subtitle_y_position: number;
}

export interface GenerateFinalVideoResponse {
  final_video_url: string;
}

export interface MusicPreview {
  title: string;
  url: string;
}

export interface GetMusicPreviewsResponse {
  previews: MusicPreview[];
}

// ✅ API 함수 정의

export const generateMaterial = async (
  payload: GenerateMaterialRequest,
): Promise<GenerateMaterialResponse> => {
  const response = await videoAxiosInstance.post('/generate/material', payload);
  return response.data;
};

export const regenerateImage = async (
  payload: RegenerateImageRequest,
): Promise<RegenerateImageResponse> => {
  const response = await videoAxiosInstance.post(
    '/generate/material/image',
    payload,
  );
  return response.data;
};

export const generatePartialVideo = async (
  payload: GeneratePartialVideoRequest,
): Promise<GeneratePartialVideoResponse> => {
  const response = await videoAxiosInstance.post(
    '/generate/video/partial',
    payload,
  );
  return response.data;
};

export const generatePartialVideoWithUpload = async (
  files: {uri: string; name: string; type: string}[],
  subtitles: string[],
): Promise<{video_urls: string[]}> => {
  const formData = new FormData();

  subtitles.forEach(subtitle => {
    formData.append('subtitles', subtitle);
  });

  files.forEach(file => {
    formData.append('files', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);
  });

  const response = await videoAxiosInstance.post(
    '/generate/video/partial/upload-images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export const regenerateSinglePartialVideo = async (
  payload: RegenerateSinglePartialVideoRequest,
): Promise<RegenerateSinglePartialVideoResponse> => {
  const response = await videoAxiosInstance.post(
    '/generate/video/partial/single',
    payload,
  );
  return response.data;
};

export const generateFinalVideo = async (
  payload: GenerateFinalVideoRequest,
): Promise<GenerateFinalVideoResponse> => {
  const response = await videoAxiosInstance.post(
    '/generate/video/final',
    payload,
  );
  return response.data;
};

export const getMusicPreviews = async (): Promise<GetMusicPreviewsResponse> => {
  const response = await videoAxiosInstance.get('/previews');
  return response.data;
};
