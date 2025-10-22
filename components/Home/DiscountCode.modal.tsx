import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../component/CustomTextInput';
import { useState, useEffect } from 'react';
import CustomButton from '../component/CustomButton';

interface EditNameProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialValue?: string;
}

const DiscountCodeModal = (props: EditNameProps) => {
  const { visible, onClose, onSave, initialValue = '' } = props;

  const [code, setCode] = useState(initialValue);

  // Cập nhật state khi mở modal
  useEffect(() => {
    if (visible) {
      setCode(initialValue);
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    if (code !== initialValue) {
      onSave(code);
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
          <Text style={styles.title}>Phiếu giảm giá</Text>

          {/* Input */}
          <CustomTextInput
            title="Mã giảm giá"
            value={code}
            onChangeText={setCode}
          />

          <CustomButton
            title="Thêm mã"
            onPress={handleSave}
            disabled={code === initialValue}
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

export default DiscountCodeModal;
