import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur'; // ✅ Blur 효과 추가
import { styles } from '../../styles/bottomtab/3000-addScreenStyles';
import { scaleSize, scaleFont } from '../../styles/responsive';
import { COLORS } from '../styles/colors'; // 🎨 색상 파일 가져오기

type RootStackParamList = {
  ShortsStack: { screen: string };
  PhotoStack: { screen: string };
};

type AddScreenModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AddScreenModal: React.FC<AddScreenModalProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // ✅ 애니메이션 값 useRef로 관리
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          {/* ✅ 흐린 배경 추가 */}
          <BlurView style={styles.blurBackground} blurType="dark" blurAmount={10} />

          <Animated.View
            style={[
              styles.modalContent,
              { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] },
            ]}
          >
            {/* 쇼츠 영상 버튼 */}
            <TouchableOpacity
              style={[styles.button, { height: scaleSize(60), marginBottom: scaleSize(15) }]}
              onPress={() => {
                navigation.navigate('ShortsStack', { screen: 'PromptInputScreen' });
                onClose();
              }}
            >
              <Text style={[styles.buttonText, { fontSize: scaleFont(18) }]}>쇼츠용 영상</Text>
            </TouchableOpacity>

            {/* 내 사진 영상 버튼 */}
            <TouchableOpacity
              style={[styles.button, { height: scaleSize(60) }]}
              onPress={() => {
                navigation.navigate('PhotoStack', { screen: 'PhotoPromptScreen' });
                onClose();
              }}
            >
              <Text style={[styles.buttonText, { fontSize: scaleFont(18) }]}>내 사진 영상</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddScreenModal;
