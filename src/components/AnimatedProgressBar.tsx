import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  progress: number; // 0 ~ 1
}

const AnimatedProgressBar: React.FC<Props> = ({progress}) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false, // width는 JS 드라이버만 가능
    }).start();

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
  }, [progress, scaleAnim, widthAnim]);

  const percentPosition = barWidth * progress;

  return (
    <View style={styles.wrapper}>
      <View
        style={styles.barBackground}
        onLayout={(e: LayoutChangeEvent) =>
          setBarWidth(e.nativeEvent.layout.width)
        }>
        {barWidth > 0 && (
          <Animated.View
            style={[
              styles.barFill,
              {
                width: percentPosition,
                transform: [{scale: scaleAnim}],
              },
            ]}>
            <LinearGradient
              colors={['#51BCB4', '#6ED4C8']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        )}
      </View>
      <View style={styles.percentWrapperOuter}>
        <View style={[styles.percentWrapper, {left: percentPosition - 22}]}>
          <View style={styles.arrow} />
          <Text style={styles.percentText}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
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
  percentWrapperOuter: {
    width: '90%',
    height: 20,
    position: 'relative',
  },

  barFill: {
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  percentWrapper: {
    position: 'absolute',
    top: 10,
    alignItems: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#51BCB4',
    marginBottom: 2,
  },
  percentText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#E6FAF9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});

export default AnimatedProgressBar;
