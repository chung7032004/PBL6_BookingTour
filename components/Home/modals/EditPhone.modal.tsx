import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomTextInput from '../../component/CustomTextInput';
import { useState, useEffect } from 'react';
import CustomButton from '../../component/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface EditPhoneProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialValue?: string;
}

const EditPhoneModal = (props: EditPhoneProps) => {
  const { visible, onClose, onSave, initialValue = '' } = props;

  const [phone, setPhone] = useState(initialValue);
  const [showError, setShowError] = useState(false);

  // Cập nhật lại mỗi khi mở modal
  useEffect(() => {
    if (visible) {
      setPhone(initialValue);
      setShowError(false);
    }
  }, [visible, initialValue]);
  const handleSave = () => {
    if (!/^\d{9}$/.test(phone.trim())) {
      setShowError(true);
      return;
    }
    onSave(phone);
    onClose();
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
          {/* Nút đóng */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <MaterialIcons name="close" size={22} color="#666" />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <Text style={styles.title}>Chỉnh sửa số điện thoại</Text>
          <Text style={styles.desc}>
            Nhập số điện thoại mà bạn muốn host có thể liên hệ khi cần.
          </Text>

          <CustomTextInput
            title="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          {showError && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={16} color="red" />
              <Text style={styles.error}>Số điện thoại chỉ gồm 9 số</Text>
            </View>
          )}

          <CustomButton
            title="Lưu"
            onPress={handleSave}
            disabled={phone.trim() === ''}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditPhoneModal;

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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    marginBottom: 12,
    color: '#555',
    fontSize: 15,
    fontWeight: '400',
  },
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
