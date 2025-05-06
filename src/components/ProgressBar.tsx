import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/common/progressBarStyles';

interface ProgressBarProps {
  currentStep: number; // 현재 단계 (1부터 시작)
  totalSteps?: number; // 전체 단계 수 (선택)
  mode?: 'photo' | 'ai'; // 선택: 모드에 따라 자동 단계 설정
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  mode,
}) => {
  // 모드 기반 자동 단계 설정
  const resolvedSteps = totalSteps ?? (mode === 'photo' ? 3 : 4); // 기본은 4

  return (
    <View style={styles.progressContainer}>
      {Array.from({length: resolvedSteps}, (_, index) => (
        <React.Fragment key={index}>
          <Text
            style={
              index + 1 === currentStep ? styles.dotActive : styles.dotInactive
            }>
            {index + 1 === currentStep ? '●' : '○'}
          </Text>
          {index < resolvedSteps - 1 && <View style={styles.line} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default ProgressBar;
