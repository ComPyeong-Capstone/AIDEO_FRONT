import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Share,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  visible: boolean;
  onClose: () => void;
  onUploadToYouTube: () => void;
  onCopyLink: () => void;
  videoURL: string | null;
  title: string;
  creator: string;
}

const CustomShareModal: React.FC<Props> = ({
  visible,
  onClose,
  onUploadToYouTube,
  onCopyLink,
  videoURL,
  title,
  creator,
}) => {
  const handleShare = async () => {
    if (!videoURL) {
      Alert.alert('오류', '영상 URL이 없습니다.');
      return;
    }

    try {
      Clipboard.setString(videoURL);
      await Share.share({
        message: `[${title}]\n\n${creator}님의 숏츠를 확인해보세요!\n👉 ${videoURL}`,
      });
      onClose();
    } catch (error: any) {
      console.error('공유 실패:', error.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modal}>
        <Text style={styles.title}>공유</Text>

  <View style={styles.optionContainer}>
    <TouchableOpacity style={styles.button} onPress={handleShare}>
      <Ionicons name="link-outline" size={20} color="#000" style={styles.icon} />
      <Text style={styles.buttonText}>링크 복사</Text>
    </TouchableOpacity>
  <View style={styles.separator} />

    <TouchableOpacity style={styles.button} onPress={onUploadToYouTube}>
      <Ionicons name="logo-youtube" size={20} color="#FF0000" style={styles.icon} />
      <Text style={styles.buttonText}>YouTube 업로드</Text>
    </TouchableOpacity>
  </View>


        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomShareModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    minHeight: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  optionContainer: {
    gap: 5,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
  },
  cancelButton: {
    marginTop: 5,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 17,
    color: 'red',
  },
separator: {
  height: 1,
  backgroundColor: '#ddd',
  marginVertical: 2,
  width: '100%',
},

});
