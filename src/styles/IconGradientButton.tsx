import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scaleFont, scaleSize} from '../styles/responsive';
import {COLORS} from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  variant?: 'primary' | 'blue' | 'danger' | 'gray'; // ✅ gray 추가
}

const IconGradientButton: React.FC<Props> = ({
  title,
  iconName,
  onPress,
  style,
  textStyle,
  iconSize = 18,
  variant = 'primary',
}) => {
const gradientColors =
  variant === 'blue'
    ? ['#4A90E2', '#357ABD']
    : variant === 'danger'
    ? ['#FF6B6B', '#FF4E50']
    : variant === 'gray'
    ? ['#dcdcdc', '#f2f2f2']
    : variant === 'youtube'
    ? ['#FF0000', '#CC0000']
    : ['#51BCB4', '#6ED4C8']; // 기본값


  const textColor = variant === 'gray' ? '#333' : '#fff';
  const iconColor = textColor; // 글자색과 아이콘색을 통일

  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradientColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Icon name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
          <Text style={[styles.text, textStyle, { color: textColor }]}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default IconGradientButton;

const styles = StyleSheet.create({
  wrapper: {
    height: scaleSize(44),
    borderRadius: scaleSize(20),
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: scaleSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
        justifyContent: 'center', // ✅ 가운데 정렬 추가

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleSize(16),

  },
  icon: {
    marginRight: scaleSize(15),
        color: '#fff',
  },
   blackicon: {
      marginRight: scaleSize(15),
    },
  text: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '600',
    textAlign: 'center', // 추가

  },
  buttonContainer: {
    paddingHorizontal: scaleSize(20), // ✅ 좌우 여백 설정
    width: '100%', // ✅ 전체 너비로 확장
  },
});
