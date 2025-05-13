// context/VideoGenerationContext.tsx
import React, {createContext, useContext, useState} from 'react';

interface VideoGenerationContextProps {
  isReady: boolean;
  videoUrl: string | null;
  notifyReady: (url: string) => void;
  resetStatus: () => void;
}

const VideoGenerationContext = createContext<VideoGenerationContextProps>({
  isReady: false,
  videoUrl: null,
  notifyReady: () => {},
  resetStatus: () => {},
});

export const VideoGenerationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const notifyReady = (url: string) => {
    setVideoUrl(url);
    setIsReady(true);
  };

  const resetStatus = () => {
    setIsReady(false);
    setVideoUrl(null);
  };

  return (
    <VideoGenerationContext.Provider
      value={{isReady, videoUrl, notifyReady, resetStatus}}>
      {children}
    </VideoGenerationContext.Provider>
  );
};

export const useVideoGeneration = () => useContext(VideoGenerationContext);
