// src/utils/defaultProfile.ts

export const defaultProfileImages = [
  require('../assets/images/profile/profile1.jpg'),
  require('../assets/images/profile/profile2.jpg'),
  require('../assets/images/profile/profile3.jpg'),
  require('../assets/images/profile/profile4.jpg'),
  require('../assets/images/profile/profile5.jpg'),
  require('../assets/images/profile/profile6.jpg'),
  require('../assets/images/profile/profile7.jpg'),
  require('../assets/images/profile/profile8.jpg'),
  require('../assets/images/profile/profile9.jpg'),
  require('../assets/images/profile/profile10.jpg'),
  require('../assets/images/profile/profile11.jpg'),
];

/**
 * UI에서 실제 이미지 뿌릴 때 사용
 * ex) <Image source={getRandomProfileImage()} />
 */
export const getRandomProfileImage = () => {
  const index = Math.floor(Math.random() * defaultProfileImages.length);
  return defaultProfileImages[index];
};

/**
 * 서버에 보낼 프로필 이미지 파일명 (ex: 'profile5.jpg')
 */
export const getRandomProfileImageFileName = () => {
  const index = Math.floor(Math.random() * defaultProfileImages.length);
  return `profile${index + 1}.jpg`;
};
