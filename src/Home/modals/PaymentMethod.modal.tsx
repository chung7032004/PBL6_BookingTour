import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomRadioButton from '../../components/CustomRadioButton';

export type PaymentMethod = 'momo' | 'zalopay' | 'cash';

interface PaymentMethodProps {
  visible: boolean;
  onClose: () => void;
  onSave: (method: PaymentMethod) => void;
  initialMethod: PaymentMethod;
}

const PaymentMethodModal: React.FC<PaymentMethodProps> = ({
  visible,
  onClose,
  onSave,
  initialMethod,
}) => {
  const [selected, setSelected] = useState<PaymentMethod>(initialMethod);

  const handleSave = () => {
    onSave(selected);
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
          {/* Header: tiêu đề + nút đóng */}
          <View style={styles.header}>
            <Text style={styles.title}>Chọn phương thức thanh toán</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialIcons name="close" size={22} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Các lựa chọn */}
          <View style={styles.radioGroup}>
            <CustomRadioButton
              label="Thanh toán bằng Momo"
              selected={selected === 'momo'}
              onPress={() => setSelected('momo')}
            />
            <CustomRadioButton
              label="Thanh toán qua ZaloPay"
              selected={selected === 'zalopay'}
              onPress={() => setSelected('zalopay')}
            />
            <CustomRadioButton
              label="Thanh toán trực tiếp"
              selected={selected === 'cash'}
              onPress={() => setSelected('cash')}
            />
          </View>

          {/* Nút hoàn tất */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
            <Text style={styles.confirmText}>Hoàn tất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentMethodModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  closeBtn: {
    marginLeft: 10,
    padding: 4,
  },
  radioGroup: {
    marginVertical: 6,
    marginLeft: 4,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 14,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
