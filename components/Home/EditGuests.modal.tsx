import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import CustomButton from '../component/CustomButton';
import { Quantity } from './quantity';
import CustomCheckbox from '../component/CustomCheckBox';

interface EditGuestsProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onSave: (quantity: Quantity) => void;
  initialValue?: Quantity;
}

const EditGuests = (props: EditGuestsProps) => {
  const {
    title = 'Chỉnh sửa thông tin khách',
    visible,
    onClose,
    onSave,
    initialValue,
  } = props;

  const [adult, setAdult] = useState(initialValue?.adult || 1);
  const [children, setChildren] = useState(initialValue?.children || 0);
  const total = adult + children;

  const [guardianConfirmed, setGuardianConfirmed] = useState(false);
  const [error, setError] = useState(false);

  const handleSave = () => {
    const quantity: Quantity = { adult, children, total };
    if (children >= 1 && guardianConfirmed) {
      onSave(quantity);
      setError(false);
      onClose();
    } else if (children >= 1 && !guardianConfirmed) {
      setError(true);
    } else {
      onSave(quantity);
      setError(false);
      onClose();
    }
  };

  const handleClose = () => {
    setGuardianConfirmed(false);
    setError(false);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={handleClose}>
              <MaterialIcons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Người lớn */}
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.label}>Người lớn</Text>
              <Text style={styles.desc}>Độ tuổi từ 13 trở lên</Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setAdult(Math.max(1, adult - 1))}
              >
                <MaterialIcons name="remove" size={26} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.number}>{adult}</Text>
              <TouchableOpacity onPress={() => setAdult(adult + 1)}>
                <MaterialIcons name="add" size={26} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Trẻ em */}
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.label}>Trẻ em</Text>
              <Text style={styles.desc}>Độ tuổi từ 2 - 12</Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setChildren(Math.max(0, children - 1))}
              >
                <MaterialIcons name="remove" size={26} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.number}>{children}</Text>
              <TouchableOpacity onPress={() => setChildren(children + 1)}>
                <MaterialIcons name="add" size={26} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>

          {children > 0 && (
            <View style={styles.notice}>
              <Text style={styles.noticeTitle}>
                Xác nhận của người giám hộ hợp pháp
              </Text>
              <Text style={styles.noticeText}>
                Tôi là người giám hộ hợp pháp của tất cả trẻ vị thành niên và sẽ
                có mặt trong suốt trải nghiệm này. Trẻ vị thành niên đáp ứng yêu
                cầu của host về độ tuổi.
              </Text>
              <View style={styles.checkboxRow}>
                <CustomCheckbox
                  checked={guardianConfirmed}
                  onChange={() => {
                    setGuardianConfirmed(!guardianConfirmed);
                    if (!guardianConfirmed) setError(false);
                  }}
                />
                {error && (
                  <Text style={styles.errorText}>
                    Vui lòng xem kỹ và xác nhận.
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.total}>{total} khách</Text>
            <CustomButton title="Lưu" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditGuests;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  desc: {
    fontSize: 12,
    color: '#666',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  notice: {
    marginVertical: 12,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  noticeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 12,
    color: '#555',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    marginLeft: 8,
    color: 'red',
    fontSize: 13,
    fontWeight: '500',
  },
});
