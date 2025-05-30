import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SortModal = ({ visible, onSelect, onClose, anchorPosition }) => {
  if (!visible) return null;

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View
        style={[
          styles.modal,
          {
            position: 'absolute',
            top: anchorPosition?.y ?? 60,
            right: width - (anchorPosition?.x ?? width),
          },
        ]}
      >
        {['최신순', '오래된순', '좋아요순'].map(option => (
          <TouchableOpacity key={option} onPress={() => onSelect(option)} style={styles.option}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  option: {
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
