import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/common/progressBarStyles';

interface ProgressBarProps {
  currentStep: number; // 현재 단계 (1부터 시작)
  totalSteps?: number; // 전체 단계 수 (선택)
  mode?: 'photo' | 'shorts' | 'ai'; // ✅ 모드에 'shorts' 추가
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  mode,
}) => {
  // ✅ 모드별 기본 단계 수 매핑
  const modeStepMap: Record<'photo' | 'shorts' | 'ai', number> = {
    photo: 3,
    shorts: 4,
    ai: 4,
  };

  // ✅ 총 단계 수 결정
  const resolvedSteps = totalSteps ?? (mode ? modeStepMap[mode] : 4);

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
