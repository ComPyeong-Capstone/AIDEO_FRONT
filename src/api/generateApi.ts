import {videoAxiosInstance} from './axiosInstance';

// ✅ Request / Response 타입 정의
export interface GenerateMaterialRequest {
  title: string;
  duration: number;
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

// ✅ 입력 프롬프트를 통한 사진 및 자막 생성
export const generateMaterial = async (
  payload: GenerateMaterialRequest,
): Promise<GenerateMaterialResponse> => {
  const response = await videoAxiosInstance.post('/generate/material', payload);
  return response.data;
};

// ✅ 이미지 하나 재생성
export const regenerateImage = async (
  payload: RegenerateImageRequest,
): Promise<RegenerateImageResponse> => {
  const response = await videoAxiosInstance.post(
    '/generate/material/image',
    payload,
  );
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

// ✅ 사진과 자막을 form-data로 전송하여 부분 영상 생성
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

// ✅ 부분 영상 하나 재생성
export const regenerateSinglePartialVideo = async (
  payload: RegenerateSinglePartialVideoRequest,
): Promise<RegenerateSinglePartialVideoResponse> => {
  const response = await videoAxiosInstance.post(
    '/generate/video/partial/single',
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

// ✅ 음악 프리뷰 목록 호출
export const getMusicPreviews = async (): Promise<GetMusicPreviewsResponse> => {
  const response = await videoAxiosInstance.get('/previews');
  return response.data;
};
