import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';

interface CreateListModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (content: string) => void;
}

const CreateListModal = ({
  visible,
  onClose,
  onCreate,
}: CreateListModalProps) => {
  const [content, setContent] = useState('');

  const handleCreate = () => {
    if (content.trim() !== '') {
      onCreate(content);
      setContent(''); // reset input
    }
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
            <Text style={styles.title}>Create new wishlist</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={28} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your list name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter name wish list"
              placeholderTextColor={'#ccc'}
              multiline
              numberOfLines={3}
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
              maxLength={50}
            />
            <Text style={styles.charCount}>{content.length}/50</Text>
          </View>

          {/* Button */}
          <CustomButton
            title="Create now"
            style={styles.button}
            onPress={handleCreate}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateListModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#FF5A5F',
    borderRadius: 12,
    paddingVertical: 12,
  },
});
