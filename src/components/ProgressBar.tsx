import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/common/progressBarStyles';

interface ProgressBarProps {
  currentStep: number; // 1 ~ 4
  totalSteps?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 4,
}) => {
  return (
    <View style={styles.progressContainer}>
      {Array.from({length: totalSteps}, (_, index) => (
        <React.Fragment key={index}>
          <Text
            style={
              index + 1 === currentStep ? styles.dotActive : styles.dotInactive
            }>
            {index + 1 === currentStep ? '●' : '○'}
          </Text>
          {index < totalSteps - 1 && <View style={styles.line} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default ProgressBar;
