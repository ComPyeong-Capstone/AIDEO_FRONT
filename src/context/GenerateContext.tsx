import React, {createContext, useContext, useState, ReactNode} from 'react';

// ✅ 결과 타입 정의 - videos는 선택(optional)
interface GenerateResult {
  prompt: string;
  duration: number;
  imageUrls: string[];
  subtitles: string[];
  videos?: string[]; // ✅ 선택적 필드로 추가
}

interface GenerateContextType {
  isDone: boolean;
  resultData: GenerateResult | null;
  setResult: (data: GenerateResult) => void;
  clearResult: () => void;
}

// ✅ Context 생성
const GenerateContext = createContext<GenerateContextType | undefined>(
  undefined,
);

// ✅ Provider 컴포넌트
export const GenerateProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [isDone, setIsDone] = useState(false);
  const [resultData, setResultData] = useState<GenerateResult | null>(null);

  // ✅ 결과 저장 및 완료 상태 true 설정
  const setResult = (data: GenerateResult) => {
    setResultData(data);
    setIsDone(true);
  };

  // ✅ 상태 초기화
  const clearResult = () => {
    setResultData(null);
    setIsDone(false);
  };

  return (
    <GenerateContext.Provider
      value={{isDone, resultData, setResult, clearResult}}>
      {children}
    </GenerateContext.Provider>
  );
};

// ✅ 커스텀 훅 (Context 내부에서만 사용 가능)
export const useGenerate = () => {
  const context = useContext(GenerateContext);
  if (!context) {
    throw new Error('useGenerate must be used within a GenerateProvider');
  }
  return context;
};
