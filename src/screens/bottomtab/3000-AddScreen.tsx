import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BlurView} from '@react-native-community/blur';
import {styles} from '../../styles/bottomtab/3000-addScreenStyles';
import {scaleSize, scaleFont} from '../../styles/responsive';

type RootStackParamList = {
  ShortsStack: {screen: string};
  PhotoStack: {screen: string};
  PostVideoStack: {screen: string};
};

type AddScreenModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AddScreenModal: React.FC<AddScreenModalProps> = ({visible, onClose}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: visible ? 1 : 0,
        duration: visible ? 300 : 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: visible ? 0 : 100,
        duration: visible ? 300 : 200,
        useNativeDriver: true,
      }),

    ]).start();
  }, [visible, opacityAnim, translateYAnim]);

  const handleNavigate = (stack: keyof RootStackParamList, screen: string) => {
    navigation.navigate(stack, {screen});
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.blurBackground}
            blurType="dark"
            blurAmount={10}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {opacity: opacityAnim, transform: [{translateY: translateYAnim}]},
            ]}>
            {/* 쇼츠용 영상 */}
            <TouchableOpacity
              style={[
                styles.button,
                {height: scaleSize(60), marginBottom: scaleSize(15)},
              ]}
              onPress={() =>
                handleNavigate('ShortsStack', 'SelectDurationScreen')
              }>
              <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
                쇼츠용 영상
              </Text>
            </TouchableOpacity>

            {/* 내 사진 영상 */}
            <TouchableOpacity
              style={[styles.button, {height: scaleSize(60),marginBottom: scaleSize(15)}]}
              onPress={() => handleNavigate('PhotoStack', 'PhotoPromptScreen')}>
              <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
                내 사진 영상
              </Text>
            </TouchableOpacity>

            {/*내 영상 업로드 */}
            <TouchableOpacity
              style={[styles.button, {height: scaleSize(60)}]}
              onPress={() => handleNavigate('PostVideoScreen')}>
              <Text style={[styles.buttonText, {fontSize: scaleFont(18)}]}>
                영상 업로드
              </Text>
            </TouchableOpacity>

          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddScreenModal;
