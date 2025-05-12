import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {COLORS} from './colors';
import {scaleSize, scaleFont} from './responsive'; // ✅ 반응형 유틸리티

interface Props {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'gray';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const CommonButton: React.FC<Props> = ({
  title,
  onPress,
  type = 'primary',
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[type], disabled && styles.disabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  base: {
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
  disabled: {
    opacity: 0.5,
  },
});
