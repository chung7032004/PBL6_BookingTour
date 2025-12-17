import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton';
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
      let normalized = initialValue.trim();
      // 0xxxxxxxxx → +84xxxxxxxxx
      if (/^0\d{9}$/.test(normalized)) {
        normalized = '+84' + normalized.slice(1);
      }
      // 84xxxxxxxxx → +84xxxxxxxxx
      if (/^84\d{9}$/.test(normalized)) {
        normalized = '+' + normalized;
      }
      // Nếu không bắt đầu +84 → tự thêm
      if (!normalized.startsWith('+84')) {
        normalized = '+84';
      }
      setPhone(normalized);
      setShowError(false);
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    // +84 và 9 số = 12 ký tự
    if (!/^\+84\d{9}$/.test(phone)) {
      setShowError(true);
      return;
    }
    onSave(phone);
    onClose();
  };
  const handleChangePhone = (text: string) => {
    // Luôn bắt đầu bằng +84
    let clean = text.replace(/[^0-9+]/g, '');
    // Đảm bảo luôn giữ +84 ở đầu
    if (!clean.startsWith('+84')) {
      clean = '+84';
    }
    // Chỉ giữ số phía sau +84
    clean = '+84' + clean.slice(3).replace(/[^0-9]/g, '');
    // Giới hạn tối đa +84 + 9 số = 12 ký tự
    if (clean.length <= 12) {
      setPhone(clean);
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
          {/* Nút đóng */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <MaterialIcons name="close" size={22} color="#666" />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <Text style={styles.title}>Edit phone number</Text>
          <Text style={styles.desc}>
            Enter a phone number where the host can contact you if needed.
          </Text>

          <CustomTextInput
            title="Phone number"
            value={phone}
            onChangeText={handleChangePhone}
            keyboardType="phone-pad"
            maxLength={12}
          />
          <Text style={styles.counter}>{phone.length}/12</Text>

          {showError && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={16} color="red" />
              <Text style={styles.error}>
                Phone number must be in +84 format and contain 9 digits.
              </Text>
            </View>
          )}

          <CustomButton
            title="Save"
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
  counter: {
    textAlign: 'right',
    color: '#888',
    fontSize: 13,
    marginBottom: 8,
  },
});
