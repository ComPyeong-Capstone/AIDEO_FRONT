module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // ✅ 필수: reanimated 플러그인 추가 (항상 마지막에 위치)
  ],
};
