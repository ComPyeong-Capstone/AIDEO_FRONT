import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, LayoutChangeEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  progress: number; // 0 ~ 1
}

const AnimatedProgressBar: React.FC<Props> = ({ progress }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // width (JS driver)
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: true, // ⚠️ width는 JS만 가능
    }).start();

    // scale (Native driver)
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [progress]);

  return (
    <View style={styles.wrapper}>
      <View
        style={styles.barBackground}
        onLayout={(e: LayoutChangeEvent) =>
          setBarWidth(e.nativeEvent.layout.width)
        }
      >
        {barWidth > 0 && (
          <Animated.View
            style={[
              styles.barFill,
              {
      width: barWidth * progress, // 여기 수정!
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#51BCB4', '#6ED4C8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        )}
      </View>
      <Text style={styles.label}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  barBackground: {
    width: '90%',
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default AnimatedProgressBar;
