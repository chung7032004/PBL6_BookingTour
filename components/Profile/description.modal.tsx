import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface DescriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void; // callback gửi dữ liệu ra ngoài
  title?: string;
  initialValue?: string; // để load giá trị cũ nếu có
}

function DescriptionModal(props: DescriptionModalProps) {
  const {
    visible,
    onClose,
    onSave,
    title = 'Cập nhật mô tả',
    initialValue = '',
  } = props;
  const [description, setDescription] = useState(initialValue);

  const handleSave = () => {
    onSave(description); // gửi dữ liệu về cha
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
          <Text style={styles.title}>{title}</Text>

          {/* Input */}
          <Text style={styles.label}>Tiểu sử</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mô tả về bạn..."
            placeholderTextColor="#999"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>Lưu</Text>
            </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
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
    backgroundColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
  cancelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
  },
  saveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default DescriptionModal;
