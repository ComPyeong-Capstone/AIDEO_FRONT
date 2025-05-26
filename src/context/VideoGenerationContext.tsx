import React, {createContext, useContext, useState} from 'react';

// 영상 데이터 전체 타입 정의
interface VideoData {
  from: 'photo' | 'shorts';
  prompt: string;
  videos: string[];
  subtitles: string[];
  images: any[];
  files: any[];
  previewImage?: string;
  previewSubtitle?: string;
}

interface VideoGenerationContextProps {
  isReady: boolean;
  videoData: VideoData | null;
  notifyReady: (data: VideoData) => void;
  resetStatus: () => void;
}

// 기본값 설정
const VideoGenerationContext = createContext<VideoGenerationContextProps>({
  isReady: false,
  videoData: null,
  notifyReady: () => {},
  resetStatus: () => {},
});

export const VideoGenerationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  const notifyReady = (data: VideoData) => {
    setVideoData(data);
    setIsReady(true);
  };

  const resetStatus = () => {
    setIsReady(false);
    setVideoData(null);
  };

  return (
    <VideoGenerationContext.Provider
      value={{isReady, videoData, notifyReady, resetStatus}}>
      {children}
    </VideoGenerationContext.Provider>
  );
};

// 훅으로 사용
export const useVideoGeneration = () => useContext(VideoGenerationContext);
