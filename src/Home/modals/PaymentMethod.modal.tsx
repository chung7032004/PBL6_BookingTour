import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Chỉ giữ lại 2 phương thức
export type PaymentMethod = 'momo' | 'cash';

interface PaymentMethodModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (method: PaymentMethod) => void;
  initialMethod?: PaymentMethod;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  visible,
  onClose,
  onSave,
  initialMethod = 'momo',
}) => {
  const [selected, setSelected] = useState<PaymentMethod>(initialMethod);

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  const methods = [
    {
      value: 'momo' as const,
      label: 'Ví MoMo',
      icon: 'smartphone', // icon iPhone
      color: '#d63384', // hồng MoMo chuẩn
    },
    {
      value: 'cash' as const,
      label: 'Thanh toán tại chỗ',
      icon: 'attach-money',
      color: '#10B981', // xanh lá
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Phương thức thanh toán</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={26} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Danh sách phương thức */}
          <View style={styles.methodList}>
            {methods.map(item => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.methodItem,
                  selected === item.value && styles.selectedItem,
                ]}
                onPress={() => setSelected(item.value)}
              >
                <View style={styles.methodLeft}>
                  <MaterialIcons
                    name={item.icon}
                    size={34}
                    color={item.color}
                    style={styles.methodIcon}
                  />
                  <Text style={styles.methodLabel}>{item.label}</Text>
                </View>

                {/* Radio */}
                <View
                  style={[
                    styles.radioOuter,
                    selected === item.value && styles.radioSelected,
                  ]}
                >
                  {selected === item.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Nút xác nhận */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
            <Text style={styles.confirmText}>Xác nhận</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  methodList: {
    marginTop: 16,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    marginBottom: 12,
  },
  selectedItem: {
    backgroundColor: '#fdf2f8',
    borderWidth: 1.5,
    borderColor: '#d63384',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    marginRight: 16,
  },
  methodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#d63384',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#d63384',
  },
  confirmButton: {
    backgroundColor: '#d63384', // hồng MoMo làm nút chính luôn cho đẹp
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
