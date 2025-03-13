터미널 1: npm start
터미널 2(새로운 터미널을 열어야함): npx react-native run-ios



백그라운드 관리 방법


import { COLORS } from '../../styles/colors'; ->>> 이런 식으로 import

COLORS라는 객체를 생성했기 때문에


⬇️⬇️⬇️⬇️⬇️⬇️⬇️

backgroundColor: COLORS.background, 

button: {
backgroundColor: COLORS.buttonBackground, // ✅ 전역 변수 사용
borderRadius: scaleSize(5),
alignItems: 'center',
justifyContent: 'center',
margin: scaleSize(5),
paddingVertical: scaleSize(8),
paddingHorizontal: scaleSize(15),
},

이런식으로 COLORS.변수이름으로 색상 설정
