// types/common.ts

// ✅ 단일 이미지 항목 타입 정의
export type ImageItem = {
  id: string;
  uri: string | null;
  name?: string; // 선택적: 실제 파일명 (iOS 시뮬레이터 경로 대응 포함)
};
