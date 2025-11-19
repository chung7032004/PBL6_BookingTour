import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          <Text style={styles.desc}>
            Nhập mã giảm giá của bạn ở đây. Mã hợp lệ sẽ được áp dụng khi thanh
            toán
          </Text>
          {/* Input */}
          <CustomTextInput
            title="Mã giảm giá"
            value={code}
            onChangeText={setCode}
          />

          {code === initialValue && code !== '' && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={16} color="red" />
              <Text style={styles.error}>Kiểm tra kĩ mã giảm giá của bạn</Text>
            </View>
          )}

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
    marginBottom: 10,
  },
  desc: { marginBottom: 4, color: '#555', fontSize: 15, fontWeight: '400' },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginLeft: 4,
    fontSize: 13,
  },
});

export default DiscountCodeModal;
