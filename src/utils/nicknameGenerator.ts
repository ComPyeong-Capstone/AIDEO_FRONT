// src/utils/nicknameGenerator.ts

const adjectives = [
  '멋진',
  '귀여운',
  '용감한',
  '행복한',
  '슬기로운',
  '신나는',
  '재밌는',
  '달콤한',
  '차가운',
  '따뜻한',
  '불타는',
  '푸른',
  '노란',
  '반짝이는',
  '평화로운',
];

const animals = [
  '사자',
  '호랑이',
  '고양이',
  '강아지',
  '여우',
  '토끼',
  '판다',
  '펭귄',
  '곰',
  '수달',
  '햄스터',
  '기린',
  '코끼리',
  '늑대',
  '다람쥐',
];

export const generateRandomNickname = (): string => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 1000); // 0 ~ 999

  return `${adj}${animal}${number}`; // 예: '귀여운토끼123'
};
