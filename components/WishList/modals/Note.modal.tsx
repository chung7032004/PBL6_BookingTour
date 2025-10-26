import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../component/CustomButton';

interface NotepadModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void; // callback gửi dữ liệu ra ngoài
  title?: string;
  initialValue?: string; // để load giá trị cũ nếu có
}

function NoteModal(props: NotepadModalProps) {
  const {
    visible,
    onClose,
    onSave,
    title = 'Thêm ghi chú',
    initialValue = '',
  } = props;
  const [note, setNote] = useState(initialValue);

  const handleSave = () => {
    onSave(note); // gửi dữ liệu về cha
    onClose(); // đóng modal
  };
  const handleDelete = () => {
    setNote(''); // xóa nội dung
    onSave(''); // gửi dữ liệu rỗng về cha
    onClose(); // đóng modal
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="Thêm ghi chú"
            placeholderTextColor="#999"
            multiline
            value={note}
            onChangeText={setNote}
          />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {note !== '' && (
              <CustomButton
                title="Xóa"
                onPress={handleDelete}
                style={styles.cancelButton}
              />
            )}

            <CustomButton
              title="Lưu"
              onPress={handleSave}
              disabled={note === initialValue}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
    padding: 20,
    elevation: 5,
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
  closeBtn: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#fafafa',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    marginRight: 10,
  },
});

export default NoteModal;
