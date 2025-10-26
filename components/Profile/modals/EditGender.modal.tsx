import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioGroup from '../../component/CustomRadioGroup';
import { useEffect, useState } from 'react';
import CustomButton from '../../component/CustomButton';

interface EditGenderProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  initialValue: string;
}

const EditGenderModal = (props: EditGenderProps) => {
  const {
    title = 'Chọn giới tính',
    visible,
    onClose,
    onSave,
    initialValue,
  } = props;

  const [selected, setSelected] = useState('male');

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

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
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <RadioGroup
            options={[
              { label: 'Nam', value: 'male' },
              { label: 'Nữ', value: 'female' },
            ]}
            selectedValue={selected}
            onValueChange={setSelected}
          />
          <CustomButton title="Chọn" onPress={handleSave} />
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

export default EditGenderModal;
