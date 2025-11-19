import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton';
interface EditNameProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  title?: string;
  initialValue?: string;
}

const EditNameModal = (props: EditNameProps) => {
  const {
    visible,
    onClose,
    onSave,
    title = 'Chỉnh sửa tên người dùng',
    initialValue = '',
  } = props;

  const [name, setName] = useState(initialValue);

  // Cập nhật state khi mở modal
  useEffect(() => {
    if (visible) {
      setName(initialValue);
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    if (name !== initialValue) {
      onSave(name);
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Input */}
          <CustomTextInput
            title="Nhập tên của bạn"
            value={name}
            onChangeText={setName}
          />

          {/* Save button (luôn hiện, nhưng disable nếu không thay đổi) */}
          <CustomButton
            title="Lưu"
            onPress={handleSave}
            disabled={name === initialValue}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    zIndex: 1,
  },
  closeText: {
    fontSize: 22,
    color: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default EditNameModal;
