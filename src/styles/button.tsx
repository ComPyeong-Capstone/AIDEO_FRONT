import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from './colors';
import {scaleSize, scaleFont} from './responsive'; // ✅ 반응형 유틸리티

interface Props {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'gray' | 'gradient';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}
const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  type = 'primary',
  style,
  textStyle,
  disabled = false,
}) => {
  const content = (
    <Text style={[styles.text, textStyle]}>{title}</Text>
  );

  const isGradient =
    type === 'gradient' || type === 'gray'; // ✅ gray도 gradient로 간주

  const gradientColors =
    type === 'gray'
      ? ['#dcdcdc', '#f2f2f2'] // ✅ gray 전용 그라데이션
      : ['#51BCB4', '#6ED4C8'];

  if (isGradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={[style, { borderRadius: scaleSize(20), overflow: 'hidden' }]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.gradientBackground, disabled && styles.disabled]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.base, styles[type], disabled && styles.disabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {content}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  base: {
          height: scaleSize(44), // ✅ 고정 높이

    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(25),
    borderRadius: scaleSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: COLORS.buttonText,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: '#ccc',
  },
  gray: {
    backgroundColor: '#E5E5E5',
  },
 // styles.gradientBackground 수정
 gradientBackground: {
  height: '100%',
  width: '100%',
  borderRadius: scaleSize(20),
   alignItems: 'center',
   justifyContent: 'center',
   //paddingVertical: scaleSize(8), // ✨ 여기서만 패딩
   //paddingHorizontal: scaleSize(16),
 },

  disabled: {
    opacity: 0.5,
  },
});
